
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/mockApi';
import { BlogPost as BlogPostType } from '../types';
import { Calendar, User, Clock, ArrowLeft, Check, ArrowRight, Loader2 } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const data = await api.getBlogPost(slug);
      setPost(data || null);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center pt-20"><Loader2 className="animate-spin text-green-600" size={40} /></div>;
  }

  if (!post) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-20">
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
           <Link to="/blog" className="text-green-600 hover:underline">Return to Blog</Link>
        </div>
     );
  }

  return (
    <div className="bg-white min-h-screen pt-20">
       <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate('/blog')} className="flex items-center text-gray-500 hover:text-green-600 mb-8 transition-colors">
             <ArrowLeft size={20} className="mr-2" /> Back to Blog
          </button>

          <div className="flex flex-col lg:flex-row gap-12">
             {/* Main Content */}
             <div className="lg:w-2/3">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                   {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                   <div className="flex items-center"><User size={16} className="mr-2" /> {post.author}</div>
                   <div className="flex items-center"><Calendar size={16} className="mr-2" /> {post.date}</div>
                   <div className="flex items-center"><Clock size={16} className="mr-2" /> {post.readTime}</div>
                </div>

                <div className="w-full h-80 md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-lg">
                   <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <div 
                   className="prose prose-lg max-w-none prose-green prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* In-content CTA */}
                <div className="my-12 bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                   <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to automate your WhatsApp?</h3>
                   <p className="text-gray-300 mb-6 relative z-10">Join 10,000+ businesses using Whalink to grow their sales.</p>
                   <Link to="/register" className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors relative z-10">
                      Start Free Trial
                   </Link>
                </div>
             </div>

             {/* Sticky Sidebar */}
             <div className="lg:w-1/3">
                <div className="sticky top-28 space-y-8">
                   <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-2">Try Whalink Free</h3>
                      <p className="text-sm text-gray-600 mb-6">
                         Get access to all premium features for 14 days. No credit card required.
                      </p>
                      <ul className="space-y-3 mb-6">
                         <li className="flex items-center text-sm text-gray-700">
                            <Check size={16} className="text-green-600 mr-2" /> Multi-Agent Support
                         </li>
                         <li className="flex items-center text-sm text-gray-700">
                            <Check size={16} className="text-green-600 mr-2" /> n8n Integration
                         </li>
                         <li className="flex items-center text-sm text-gray-700">
                            <Check size={16} className="text-green-600 mr-2" /> Cloud API (Always On)
                         </li>
                      </ul>
                      <Link to="/register" className="block w-full bg-green-600 text-white font-bold text-center py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
                         Start 14-Day Free Trial
                      </Link>
                   </div>

                   <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
                      <div className="space-y-4">
                         <Link to="#" className="block group">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                               5 Ways to Reduce Customer Support Costs
                            </h4>
                            <span className="text-xs text-gray-400">Sep 28, 2024</span>
                         </Link>
                         <div className="h-px bg-gray-100"></div>
                         <Link to="#" className="block group">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                               Setting up a Chatbot with OpenAI & Whalink
                            </h4>
                            <span className="text-xs text-gray-400">Sep 15, 2024</span>
                         </Link>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
