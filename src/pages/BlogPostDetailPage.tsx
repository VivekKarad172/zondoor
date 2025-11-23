import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimateInView } from "@/components/ui/motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import BlogPostContent from "@/components/blog/BlogPostContent";

const BlogPostDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    if (!slug) return;

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      
      if (!data) {
        navigate('/blog');
        return;
      }

      setPost(data as unknown as BlogPost);
      document.title = data.seo_title || data.title || "Z-ON DOOR | Blog";

      // Fetch related posts
      const { data: related } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .eq('category', data.category)
        .neq('id', data.id)
        .limit(3);

      setRelatedPosts((related as unknown as BlogPost[]) || []);
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="wesmarc-container">
            <div className="text-center py-12">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.seo_title || post.title}</title>
        <meta 
          name="description" 
          content={post.seo_description || post.subtitle || post.title} 
        />
        <meta property="og:title" content={post.seo_title || post.title} />
        <meta 
          property="og:description" 
          content={post.seo_description || post.subtitle || post.title} 
        />
        {post.main_image_url && (
          <meta property="og:image" content={post.main_image_url} />
        )}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://yourdomain.com/blog/${post.slug}`} />
      </Helmet>

      <Navbar />
      
      <div className="pt-24 pb-16">
        <AnimateInView animation="fade-in">
          <div className="wesmarc-container max-w-4xl">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Posts
            </Link>

            <article>
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {post.title}
              </h1>

              {/* Subtitle */}
              {post.subtitle && (
                <p className="text-xl text-muted-foreground mb-6">
                  {post.subtitle}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                {post.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.published_at)}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.read_time} min read
                </div>
              </div>

              {/* Main Image */}
              {post.main_image_url && (
                <div className="mb-10 rounded-lg overflow-hidden">
                  <img
                    src={post.main_image_url}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Content */}
              <BlogPostContent blocks={post.content_blocks || []} />
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-16 border-t">
                <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/blog/${related.slug}`}
                      className="group"
                    >
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img
                          src={related.main_image_url || '/placeholder.svg'}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimateInView>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPostDetailPage;
