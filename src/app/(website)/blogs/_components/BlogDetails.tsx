import React from "react";
import { Heart, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

function BlogDetailPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Blogs Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs Details", href: "/blogs" },
        ]}
      />
      <div className="container mx-auto px-6 py-12">
        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            width={600}
            height={600}
            src="/images/blogDetailsImage.jpg"
            alt="Blog Featured Image"
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Meta Information */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">By</span>
            <span className="font-semibold text-gray-900">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Date</span>
            <span className="font-semibold text-gray-900">
              January 04, 2024
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bookmark size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
          The standard Lorem Ipsum passage, used since the 1500s
        </h1>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          {/* Intro Paragraph */}
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium.
          </p>

          {/* Section Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero
            in 45 BC
          </h2>

          {/* Section Content */}
          <p className="text-base leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem.
          </p>

          {/* Subsection Heading */}
          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure
          </h3>

          <p className="text-base leading-relaxed">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut quid ex ea commodi consequatur. Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
            voluptas nulla pariatur. At vero eos et accusamus et iusto odio
            dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident, similique sunt in culpa qui
            officia deserunt mollitia animi, id est laborum et dolorum fuga.
          </p>

          {/* Another Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero
            in 45 BC
          </h2>

          <p className="text-base leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Et harum quidem rerum facilis est et expedita
            distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
            cumque nihil impedit quo minus id quod maxime placeat facere
            possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>

          <p className="text-base leading-relaxed">
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
            delectus ut aut reiciendis voluptatibus maiores alias consequatur
            aut perferendis doloribus asperiores repellat. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>

        {/* Tags Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Tags:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Blog
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Design
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Technology
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              #Insights
            </span>
          </div>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <Image
              width={500}
              height={500}
              src="/images/blogDetailsImage.jpg"
              alt="Author"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900">Admin</h3>
              <p className="text-sm text-gray-600">
                Experienced writer and content creator passionate about sharing
                insights and knowledge with readers worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
