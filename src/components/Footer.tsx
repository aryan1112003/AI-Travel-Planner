import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} AI Travel Planner. Created by Aryan Acharya
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/aryan1112003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>All rights reserved. Made with ❤️ by Aryan Acharya</p>
        </div>
      </div>
    </footer>
  );
};