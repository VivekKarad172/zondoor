-- Drop the restrictive policies
DROP POLICY IF EXISTS "Public can view published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can manage all posts" ON public.blog_posts;

-- Create PERMISSIVE policy for public to read published posts
CREATE POLICY "Public can view published posts" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');

-- Create PERMISSIVE policy for authenticated users to manage all posts
CREATE POLICY "Authenticated users can manage all posts" 
ON public.blog_posts 
FOR ALL 
USING (true)
WITH CHECK (true);