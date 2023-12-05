const User = require('../models/userModel');
const Subscription = require('../models/subscriptionModel');
const Plan = require('../models/planModel');
const stripe = require('stripe')('sk_test_51O5jK5SFewJqLbl0t0dxV991JmsunACdSvpPAI1DQ1PviS6zYKGtEuqYJgN7u2BaLydOmgXohEeRcnBxVTXyKLAC000vHQALNo');



const getSubscription = async (req, res) => {
    
    const userId = req.params.userId; 
    try {
        // const subscription = await Subscription.findOne({
        //     userId,
        //     status: 'active',
        // }).populate('planId'); 

        const subscription = await User.findOne({_id:userId}).populate('subscriptionDetails');

        if (!subscription) {
            return res.status(404).json({ message: 'No active subscription found for this user' });
        }

        res.status(200).json({ subscription, message:'Subscription details fetched successfully' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve subscription information' });
    }
};


const cancelSubscription = async (req, res) => {

    const userId = req.params.userId; 

    try {
        const subscription = await Subscription.findOne({
            userId,
            status: 'active',
        });

        if (!subscription) {
            return res.status(404).json({ message: 'No active subscription found for this user' });
        }

        // Cancel the subscription in Stripe
        // await stripe.subscriptions.update(subscription.subscriptionId, {
        //     cancel_at_period_end: true,
        // });

        subscription.status = 'canceled';
        await subscription.save();
    
        res.status(200).json({ message: 'Subscription successfully canceled' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to cancel the subscription' });
    }
};


const createSubscription = async (req, res) => {
    try {
        const { planId, token, userId } = req.body;

        // Replace 'token' with the token you receive from the frontend

        const user = await User.findById(userId);

        // Check if the user already has an active subscription
        const activeSubscription = await Subscription.findOne({
            userId: userId,
            status: 'active',
        });
        if (activeSubscription) {
            return res.status(400).json({ message: 'User already has an active subscription.' });
        }

        const plan = await Plan.findOne({ planId });
        if (!plan) {
            return res.status(400).json({ message: 'Invalid plan type.' });
        }

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { token },
        });

        // Create a customer in Stripe
        const customer = await stripe.customers.create({
            // source: token, // Use the token from the frontend
            email: user.email,
            name: user.fullName,
            payment_method: paymentMethod.id,
            invoice_settings: {
                default_payment_method: paymentMethod.id, // Use the token as the default payment method
            },
        });

        user.stripeCustomerId = customer.id;
        await user.save();

        // Create a subscription in Stripe
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price: planId,
                },
            ],
            default_payment_method: paymentMethod.id,

        });

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);

        const newSubscription = await Subscription.create({
            userId: userId,
            planId: plan._id,
            subscriptionId: subscription.id,
            status: 'active',
            startDate,
            endDate,
            paymentDate: new Date(),
            amount: plan.planAmount,
            paymentStatus: 'paid',
        });

        user.subscriptionDetails = newSubscription._id;
        await newSubscription.save();
        await user.save();

        res.status(201).json({ subscription: newSubscription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create subscription.' });
    }
};




module.exports = {
    createSubscription,
    getSubscription,
    cancelSubscription,
}