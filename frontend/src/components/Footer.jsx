import React from 'react'
import { Link } from 'react-router-dom'
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-tertiary max-padd-container text-white py-12 rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* logo dan deskripsi */}
        <div className="flex flex-col items-center md:items-start">
          <Link to={"/"} className="bold-24 mb-4">
            <h3>
              DhapaSync <span className="text-secondary">Mart</span>
            </h3>
          </Link>
          <p className="text-center md:text-left">
            Belanja? Gampang! Murah? Pasti! Aman? Jelas!
          </p>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="bold-20 mb-4">Langsung ke Tujuan</h4>
          <ul className="space-y-2 regular-15 text-gray-30">
            <li>
              <a href="/" className="hover:text-secondary">
                Beranda
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-secondary">
                Kategori
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-secondary">
                Belanja
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-secondary">
                Hubungi Kami
              </a>
            </li>
          </ul>
        </div>
        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg mb-4">Ada Pertanyaan? Hubungi Aja!</h4>
          <p>
            Email:{" "}
            <a href="" className="hover:text-secondary">
              nyxsync.io.@gmail.com
            </a>
          </p>
          <p>
            Nomer Telepon:{" "}
            <a href="" className="hover:text-secondary">
              +62 123456789
            </a>
          </p>
          <p>
            Instagram:{" "}
            <a href="" className="hover:text-secondary">
              @alwayzzselalu
            </a>
          </p>
          <p>
            Facebook:{" "}
            <a href="" className="hover:text-secondary">
              @dhapasync
            </a>
          </p>
          <p>Alamat: Jl Balai Rakyat Terusan Jakarta utara</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <SocialIcons />
        <hr className="h-[1px] w-full max-w-screen-md my-4 border-white" />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} DhapaSync | Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}

export default Footer
