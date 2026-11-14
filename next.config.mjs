import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatar.iran.liara.run", 
      "res.cloudinary.com" // 👈 Add Cloudinary domain here
    ],
  },
};

export default nextConfig;
