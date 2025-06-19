import React, { useEffect, useState } from 'react'

function Offer() {

    const calculateTimeLeft = () => {
        const difference = +new Date("2025-05-20T12:15:00") - +new Date();
        let timeLeft = {}
        
        if(difference > 0) {
            timeLeft = {
              days: String(
                Math.floor(difference / (1000 * 60 * 60 * 24))
              ).padStart(2, "0"),
              hours: String(Math.floor(difference / (1000 * 60 * 60)) % 24).padStart(
                2,
                "0"
              ),
              minutes: String(Math.floor(difference / 1000 / 60) % 60).padStart(
                2,
                "0"
              ),
              seconds: String(Math.floor(difference / 1000) % 60).padStart(2, "0"),
            };
        } else {
            timeLeft = {
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
            }
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

  return (
    <section className="max-padd-container bg-banner bg-center bg-cover h-[555px] p-8 rounded-xl my-8">
      <div className='flex items-center flex-col gap-1 mt-40 max-w-xl'>
        <h3 className='uppercase medium-20'>Waktunya belanja hemat!</h3>
        <h2 className='bold-44 uppercase'>20% off semua produk</h2>
        <span className='italic font-ace'>jangan sampai kelewat - tinggal</span>
        <div className='flex gap-x-4 xs:gap-x-7 mt-2'>
          <div className='bg-white p-2 rounded-lg'>
            <span className='font-bold text-4xl'>{timeLeft.days}</span>
            <span className='block'>Hari</span>
          </div>
          <div className='bg-white p-2 rounded-lg'>
            <span className='font-bold text-4xl'>{timeLeft.hours}</span>
            <span className='block'>Jam</span>
          </div>
          <div className='bg-white p-2 rounded-lg'>
            <span className='font-bold text-4xl'>{timeLeft.minutes}</span>
            <span className='block'>Menit</span>
          </div>
          <div className='bg-white p-2 rounded-lg'>
            <span className='font-bold text-4xl'>{timeLeft.seconds}</span>
            <span className='block'>Detik</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offer
