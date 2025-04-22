"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, ArrowLeft } from "lucide-react"

// This would typically come from a database or CMS
const blogPosts = [
  {
    title: "Building Accessible React Applications",
    excerpt:
      "Learn how to create React applications that are accessible to all users, including those with disabilities.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "April 10, 2023",
    readTime: "5 min read",
    slug: "building-accessible-react-applications",
    content: `
      <p>Web accessibility is a crucial aspect of modern web development. It ensures that websites and web applications are usable by people with disabilities, providing equal access and opportunity to all users. In this article, we'll explore how to build accessible React applications.</p>
      
      <h2>Why Accessibility Matters</h2>
      
      <p>Accessibility is not just a nice-to-have feature; it's a necessity. Here are a few reasons why:</p>
      
      <ul>
        <li>It ensures that your application can be used by everyone, regardless of their abilities.</li>
        <li>It improves the overall user experience for all users.</li>
        <li>It's often a legal requirement in many countries.</li>
        <li>It can improve your SEO and reach a wider audience.</li>
      </ul>
      
      <h2>Key Accessibility Principles</h2>
      
      <p>When building accessible React applications, keep these principles in mind:</p>
      
      <h3>1. Semantic HTML</h3>
      
      <p>Use semantic HTML elements that convey meaning about the content they contain. For example, use <code>&lt;button&gt;</code> for buttons, <code>&lt;nav&gt;</code> for navigation, and <code>&lt;article&gt;</code> for standalone content.</p>
      
      <h3>2. Keyboard Navigation</h3>
      
      <p>Ensure that all interactive elements are keyboard accessible. Users should be able to navigate through your application using only the keyboard.</p>
      
      <h3>3. ARIA Attributes</h3>
      
      <p>Use ARIA (Accessible Rich Internet Applications) attributes to enhance accessibility when HTML semantics are not sufficient.</p>
      
      <h3>4. Color Contrast</h3>
      
      <p>Ensure sufficient color contrast between text and background to make content readable for users with visual impairments.</p>
      
      <h2>Implementing Accessibility in React</h2>
      
      <p>Here are some practical tips for implementing accessibility in your React applications:</p>
      
      <h3>Use React's Built-in Accessibility Features</h3>
      
      <p>React has several built-in features that help with accessibility:</p>
      
      <pre><code>// Use the label element to associate text with form controls
&lt;label htmlFor="name"&gt;Name:&lt;/label&gt;
&lt;input id="name" type="text" /&gt;

// Use aria-* attributes
&lt;button aria-label="Close" onClick={onClose}&gt;X&lt;/button&gt;
      </code></pre>
      
      <h3>Focus Management</h3>
      
      <p>Proper focus management is crucial for keyboard navigation. Use <code>useRef</code> and <code>useEffect</code> to manage focus:</p>
      
      <pre><code>import { useRef, useEffect } from 'react';

function Modal({ isOpen }) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    isOpen && (
      &lt;div 
        ref={modalRef} 
        tabIndex="-1" 
        role="dialog" 
        aria-modal="true"
      &gt;
        {/* Modal content */}
      &lt;/div&gt;
    )
  );
}
      </code></pre>
      
      <h3>Testing for Accessibility</h3>
      
      <p>Use tools like axe-core, react-axe, or the Accessibility tab in Chrome DevTools to test your application for accessibility issues.</p>
      
      <h2>Conclusion</h2>
      
      <p>Building accessible React applications is not just about compliance; it's about creating inclusive experiences for all users. By following the principles and practices outlined in this article, you can ensure that your React applications are accessible to everyone.</p>
      
      <p>Remember, accessibility is not a one-time task but an ongoing process. Continuously test and improve the accessibility of your applications to provide the best experience for all users.</p>
    `,
  },
  {
    title: "TypeScript Best Practices for 2023",
    excerpt:
      "Discover the latest TypeScript patterns and practices that will help you write cleaner, more maintainable code.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "March 22, 2023",
    readTime: "7 min read",
    slug: "typescript-best-practices-2023",
    content: `
      <p>TypeScript has become an essential tool for modern JavaScript development, providing static typing and other features that help developers write more robust code. In this article, we'll explore the best practices for using TypeScript in 2023.</p>
      
      <h2>Why TypeScript?</h2>
      
      <p>Before diving into best practices, let's briefly discuss why TypeScript is worth using:</p>
      
      <ul>
        <li>Static typing helps catch errors at compile time rather than runtime.</li>
        <li>Better IDE support with autocompletion and type checking.</li>
        <li>Improved code documentation through type annotations.</li>
        <li>Enhanced refactoring capabilities.</li>
      </ul>
      
      <h2>TypeScript Best Practices</h2>
      
      <h3>1. Use Strict Mode</h3>
      
      <p>Enable strict mode in your TypeScript configuration to catch more potential issues:</p>
      
      <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "strict": true
    // other options...
  }
}
</code></pre>
      
      <h3>2. Prefer Interfaces for Object Shapes</h3>
      
      <p>Use interfaces for defining object shapes, especially when you expect the shape to be implemented or extended:</p>
      
      <pre><code>// Good
interface User {
  id: number;
  name: string;
  email: string;
}

// Avoid for object shapes
type User = {
  id: number;
  name: string;
  email: string;
};
</code></pre>
      
      <h3>3. Use Type for Unions, Intersections, and Utility Types</h3>
      
      <p>Use the <code>type</code> keyword for unions, intersections, and utility types:</p>
      
      <pre><code>// Union type
type Status = 'pending' | 'approved' | 'rejected';

// Intersection type
type AdminUser = User & { permissions: string[] };

// Utility type
type UserWithoutEmail = Omit<User, 'email'>;
</code></pre>
      
      <h3>4. Avoid Any</h3>
      
      <p>Minimize the use of <code>any</code> as it defeats the purpose of using TypeScript. If you need flexibility, consider using <code>unknown</code> instead:</p>
      
      <pre><code>// Avoid
function processData(data: any) {
  // ...
}

// Better
function processData(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript knows data is a string here
    return data.toUpperCase();
  }
  // ...
}
</code></pre>
      
      <h3>5. Use Function Type Expressions</h3>
      
      <p>Define function types using function type expressions:</p>
      
      <pre><code>// Function type expression
type Callback = (error: Error | null, result: string) => void;

// Using the function type
function fetchData(callback: Callback) {
  // ...
}
</code></pre>
      
      <h3>6. Leverage TypeScript's Utility Types</h3>
      
      <p>TypeScript provides several utility types that can help you manipulate types:</p>
      
      <pre><code>// Partial makes all properties optional
type PartialUser = Partial<User>;

// Required makes all properties required
type RequiredUser = Required<PartialUser>;

// Pick selects specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit removes specific properties
type PublicUser = Omit<User, 'password'>;
</code></pre>
      
      <h3>7. Use Discriminated Unions</h3>
      
      <p>Discriminated unions are a powerful pattern for handling different types of objects:</p>
      
      <pre><code>type Success = {
  status: 'success';
  data: User;
};

type Error = {
  status: 'error';
  error: string;
};

type Response = Success | Error;

function handleResponse(response: Response) {
  if (response.status === 'success') {
    // TypeScript knows response is Success here
    console.log(response.data);
  } else {
    // TypeScript knows response is Error here
    console.error(response.error);
  }
}
</code></pre>
      
      <h3>8. Use Enums with Caution</h3>
      
      <p>Enums can be useful, but they have some drawbacks. Consider using union types of string literals instead:</p>
      
      <pre><code>// Enum
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// Union type alternative
type Direction = 'up' | 'down' | 'left' | 'right';
</code></pre>
      
      <h3>9. Use Type Assertions Sparingly</h3>
      
      <p>Type assertions should be used only when you know more about a type than TypeScript does:</p>
      
      <pre><code>// Avoid unnecessary assertions
const value = 'hello' as string; // Unnecessary

// Use assertions when needed
const element = document.getElementById('app') as HTMLElement;
</code></pre>
      
      <h3>10. Organize Types in Separate Files</h3>
      
      <p>Keep your codebase organized by placing types in separate files:</p>
      
      <pre><code>// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// types/response.ts
import { User } from './user';

export type Success = {
  status: 'success';
  data: User;
};

export type Error = {
  status: 'error';
  error: string;
};

export type Response = Success | Error;
</code></pre>
      
      <h2>Conclusion</h2>
      
      <p>Following these TypeScript best practices will help you write more maintainable, robust, and error-free code. As TypeScript continues to evolve, staying up-to-date with the latest features and patterns will ensure that you get the most out of this powerful language.</p>
      
      <p>Remember, the goal of TypeScript is to enhance your development experience and improve code quality. By adopting these best practices, you'll be well on your way to becoming a more effective TypeScript developer in 2023 and beyond.</p>
    `,
  },
  {
    title: "Optimizing MongoDB for Performance",
    excerpt: "Tips and techniques for improving the performance of your MongoDB database in production environments.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "February 15, 2023",
    readTime: "6 min read",
    slug: "optimizing-mongodb-performance",
    content: `<p>This is a placeholder for the full blog post content about MongoDB optimization.</p>`,
  },
  {
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt:
      "Explore modern CSS features like Grid, Flexbox, and Custom Properties that make styling web applications easier.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "January 30, 2023",
    readTime: "4 min read",
    slug: "modern-css-techniques",
    content: `<p>This is a placeholder for the full blog post content about modern CSS techniques.</p>`,
  },
]

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-8 text-primary-500">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>

        <div className="relative h-[300px] md:h-[400px] w-full mb-8 rounded-xl overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="flex items-center text-sm text-primary-500 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-2" />
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm" className="gradient-border">
              Twitter
            </Button>
            <Button variant="outline" size="sm" className="gradient-border">
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" className="gradient-border">
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
