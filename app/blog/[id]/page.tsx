import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPosts } from "@/lib/blogData";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  const siteUrl =
    (await parent).metadataBase?.toString() || "https://your-domain.com";
  const postUrl = `${siteUrl}blog/${post.id}`;
  const imageUrl = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/og-image.png`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author, url: siteUrl }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

const BlogPostPage = async ({ params }: Props) => {
  const { id } = await params;
  const post = mockPosts.find((p) => p.id === Number(id));

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const siteUrl = "https://your-domain.com"; // Replace with your domain
  const postUrl = `${siteUrl}/blog/${post.id}`;
  const imageUrl = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/og-image.png`;

  const jsonLd: object = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteUrl,
    },
    image: imageUrl,
    url: postUrl,
    publisher: {
      "@type": "Organization",
      name: "John",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/lg.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <Link
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary-glow transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to blog
              </Link>

              {post.image && (
                <div className="w-full h-80 overflow-hidden rounded-lg mb-8 shadow-lg relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center text-text-secondary text-sm mb-8 space-x-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
              </div>

              <div
                className="prose prose-invert max-w-none text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 border-t border-border pt-6">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs px-3 py-1"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Card className="bg-gradient-card border border-border-light mt-10 p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-text-primary">
                    About the author
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex items-center">
                  <div className="w-16 h-16 rounded-full mr-4 border-2 border-primary relative overflow-hidden">
                    <Image
                      src="/profile.jpg"
                      alt="John Doe avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">John Doe</p>
                    <p className="text-sm text-text-secondary">
                      DevSecOps practitioner & Software Engineer
                    </p>
                    <p className="text-sm text-text-muted mt-1">
                      Passionate about creating secure, scalable and performant
                      software solutions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              {/* The table of contents component remains here */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
