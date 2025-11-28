
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/mockApi';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await api.getBlogPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center pt-20">
           <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
     );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
       <div className="bg-gray-900 text-white py-20 px-4">
          <div className="container mx-auto text-center">
             <h1 className="text-4xl md:text-5xl font-bold mb-4">Whalink Blog</h1>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Tips, tutorials, and insights on WhatsApp automation and customer engagement.
             </p>
          </div>
       </div>

       <div className="container mx-auto px-4 -mt-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group block">
                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="h-56 overflow-hidden">
                         <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                         <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                            <span className="flex items-center"><Calendar size={14} className="mr-1"/> {post.date}</span>
                            <span className="flex items-center"><User size={14} className="mr-1"/> {post.author}</span>
                         </div>
                         <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                            {post.title}
                         </h2>
                         <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                            {post.excerpt}
                         </p>
                         <span className="text-green-600 font-bold flex items-center mt-auto">
                            Read Article <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                         </span>
                      </div>
                   </div>
                </Link>
             ))}
          </div>
       </div>
    </div>
  );
};
