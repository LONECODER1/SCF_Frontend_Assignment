import React, { useEffect, useState } from 'react';
import {
    Trophy, Gift, DollarSign, Users, Star, Award,
    Crown, Zap, Mail, BarChart3, Copy, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/User.jsx';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('referral');
    const [copied, setCopied] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const internData = {
        name: user?.name || 'User',
        referralCode: user?.referralCode || 'LOADING...',
        email: user?.email || 'user@example.com',
        totalDonations: user?.totalDonations || 0,
        currentLevel: user?.currentLevel || 'New Member',
        referrals: user?.referrals || 0,
        emailsSent: user?.emailsSent || 0
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const rewards = [
        {
            id: 1,
            title: "Welcome Gift",
            description: "Starter pack with branded merchandise",
            requirement: "₹0 raised",
            unlocked: internData.totalDonations >= 0,
            icon: Gift,
            color: "text-green-500"
        },
        {
            id: 2,
            title: "Bronze Supporter",
            description: "Digital certificate and social media badge",
            requirement: "₹1,000 raised",
            unlocked: internData.totalDonations >= 1000,
            icon: Award,
            color: "text-amber-600"
        },
        {
            id: 3,
            title: "Silver Champion",
            description: "Exclusive webinar access + bonus materials",
            requirement: "₹5,000 raised",
            unlocked: internData.totalDonations >= 5000,
            icon: Star,
            color: "text-gray-400"
        },
        {
            id: 4,
            title: "Gold Advocate",
            description: "Leadership training session + mentorship call",
            requirement: "₹10,000 raised",
            unlocked: internData.totalDonations >= 10000,
            icon: Trophy,
            color: "text-yellow-500"
        },
        {
            id: 5,
            title: "Platinum Leader",
            description: "VIP event invitation + networking dinner",
            requirement: "₹25,000 raised",
            unlocked: internData.totalDonations >= 25000,
            icon: Crown,
            color: "text-blue-400"
        },
        {
            id: 6,
            title: "Diamond Elite",
            description: "Scholarship opportunity + conference speaking slot",
            requirement: "₹50,000 raised",
            unlocked: internData.totalDonations >= 50000,
            icon: Zap,
            color: "text-purple-500"
        }
    ];

    const milestones = [1000, 5000, 10000, 25000, 50000];
    const nextMilestone = milestones.find(m => internData.totalDonations < m) || 50000;
    const progressPercentage = Math.min((internData.totalDonations / nextMilestone) * 100, 100);
    const remainingAmount = Math.max(nextMilestone - internData.totalDonations, 0);

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Welcome back, {internData.name}! 🎉
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Track your impact and unlock amazing rewards
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/leaderboard')}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <BarChart3 className="h-5 w-5" />
                        View Leaderboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('referral')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 text-sm font-medium ${activeTab === 'referral'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <Users className="h-4 w-4" />
                                Referral
                            </button>
                            <button
                                onClick={() => setActiveTab('email')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 text-sm font-medium ${activeTab === 'email'
                                    ? 'bg-white text-purple-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <Mail className="h-4 w-4" />
                                Email
                            </button>
                        </div>

                        {activeTab === 'referral' ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        {internData.referrals} referrals
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Referral Code</h3>
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-dashed border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <code className="text-xl font-bold text-gray-800 tracking-wider">
                                            {internData.referralCode}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(internData.referralCode)}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <Copy className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Share this code to track your referrals</p>
                                {copied && <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard!</p>}
                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                        {internData.emailsSent} sent
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Email Campaign</h3>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-dashed border-purple-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <code className="text-sm font-medium text-gray-700">
                                            {internData.email}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(internData.email)}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <Share2 className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white text-purple-600 border border-purple-200 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                                            Send Email
                                        </button>
                                        <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                                            Templates
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Reach out to potential donors via email</p>
                            </>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                Active
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Donations Raised</h3>
                        <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                            ₹{internData.totalDonations.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-500">Making a real difference! 🌟</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full">
                                <Trophy className="h-6 w-6 text-yellow-600" />
                            </div>
                            <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                                Current
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Achievement Level</h3>
                        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-1">
                            {internData.currentLevel}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {rewards.filter(reward => reward.unlocked).map((reward) => {
                                const Icon = reward.icon;
                                return (
                                    <div key={reward.id} className="p-1">
                                        <Icon className={`w-5 h-5 ${reward.color}`} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress to Next Level</h3>
                    <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">₹{internData.totalDonations.toLocaleString()}</span>
                        <div className="flex-1 mx-4">
                            <div className="bg-gray-200 rounded-full h-4 shadow-inner">
                                <div
                                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 shadow-sm"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">₹{nextMilestone.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        {remainingAmount > 0 ? (
                            <>Only <span className="font-bold text-purple-600">₹{remainingAmount.toLocaleString()}</span> more to unlock the next level! 💎</>
                        ) : (
                            <span className="text-green-600 font-semibold">Congratulations! You've reached the highest level! 🎉</span>
                        )}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Gift className="h-6 w-6 mr-2 text-purple-600" />
                        Rewards & Unlockables
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rewards.map((reward) => {
                            const Icon = reward.icon;
                            return (
                                <div
                                    key={reward.id}
                                    className={`relative p-5 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${reward.unlocked
                                        ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md hover:shadow-lg'
                                        : 'border-gray-200 bg-gray-50 opacity-75 hover:opacity-90'
                                        }`}
                                >
                                    {reward.unlocked && (
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-1 shadow-lg">
                                            <Trophy className="h-4 w-4" />
                                        </div>
                                    )}
                                    <div className="flex items-start mb-3">
                                        <div className={`p-2 rounded-lg ${reward.unlocked ? 'bg-white shadow-sm' : 'bg-gray-100'} mr-3`}>
                                            <Icon className={`h-5 w-5 ${reward.unlocked ? reward.color : 'text-gray-400'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-semibold mb-1 ${reward.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                                                {reward.title}
                                            </h4>
                                            <p className={`text-sm mb-2 ${reward.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                                                {reward.description}
                                            </p>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${reward.unlocked
                                                ? 'bg-green-100 text-green-700 border border-green-200'
                                                : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {reward.requirement}
                                            </span>
                                        </div>
                                    </div>
                                    {reward.unlocked && (
                                        <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                            Unlocked!
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
