export default function Home() {
  return (
    <main className="flex flex-col items-center text-center text-white p-16 min-h-screen" style={{ background: 'linear-gradient(to bottom, #e0e0e0, #a0a0a0)', fontFamily: 'Space Grotesk, sans-serif' }}>
      <h1 className="text-5xl mb-4 text-black">🚀 PitchSense</h1>
      <p className="text-xl max-w-xl mb-8 text-black">
        The AI Fundraising Agent for Founders.
      </p>
      <a href="/pitch">
        <button className="py-4 px-8 bg-[#62C494] border-none rounded-lg font-bold shadow-lg shadow-[#4AD39C] cursor-pointer">
          Find Investors
        </button>
      </a>

      {/* New Marketing Content */}
      <section className="mt-16 w-full max-w-4xl text-black">
        <h2 className="text-3xl font-bold mb-8">From Match to Pitch — All Handled</h2>
        <p className="text-xl mb-8">
          Connect with the right investors, co-create your pitch, auto-generate outreach and track it all right here.
        </p>

        <div className="flex justify-center space-x-4 mb-12">
          <button className="py-3 px-6 bg-white text-[#060E0A] rounded-lg font-bold">Try PitchSense Free</button>
        </div>

        <div className="flex justify-around items-center mb-16 bg-black bg-opacity-50 p-4 rounded-lg">
          <div className="text-white text-center font-semibold text-sm">
            <div className="text-4xl font-bold">500+</div>
            <div className="text-xl">Active Investors</div>
          </div>
          <div className="text-white text-center font-semibold text-sm">
            <div className="text-4xl font-bold">95%</div>
            <div className="text-xl">Match Accuracy</div>
          </div>
          <div className="text-white text-center font-semibold text-sm">
            <div className="text-4xl font-bold">2.5x</div>
            <div className="text-xl">Response Rate</div>
          </div>
          <div className="text-white text-center font-semibold text-sm">
            <div className="text-4xl font-bold">24h</div>
            <div className="text-xl">Avg. Response</div>
          </div>
        </div>

        <div className="mb-16">
          <p className="text-sm uppercase tracking-wide opacity-75 text-black">TRUSTED BY LEADING VENTURE CAPITAL FIRMS</p>
        </div>

        <h2 className="text-3xl font-bold mb-8">Why founders choose PitchSense</h2>
        <p className="text-xl mb-8">Our AI-powered platform streamlines your fundraising process with smart features</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">AI-Powered Investor Matching</h3>
            <p>Our advanced AI algorithm analyzes investor preferences and startup profiles to create perfect matches.</p>
          </div>
          <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Smart Pitch Generation</h3>
            <p>Generate personalized, context-aware pitches that resonate with each investor's interests and portfolio.</p>
          </div>
          <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Engagement Analytics</h3>
            <p>Track investor interactions and optimize your outreach strategy with real-time analytics.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">What makes PitchSense different?</h2>
        <p className="text-xl mb-8">We combine AI precision with human insight to deliver a fundraising experience that's both powerful and intuitive.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-2">Trust-Aware Matching</h3>
            <p>Our AI explains why each investor is recommended, providing complete transparency in the matching process.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Complete Control</h3>
            <p>Customize every aspect of your outreach strategy, from pitch content to targeting preferences.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Team Collaboration</h3>
            <p>Share insights and coordinate outreach efforts seamlessly with your team and advisors.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Fundraising Journey?</h2>
        <p className="text-xl mb-8">
          Join hundreds of founders who are using PitchSense to connect with their ideal investors and accelerate their fundraising process.
        </p>

      </section>

      {/* Tech Stack Section */}
      <section className="mt-16 w-full max-w-4xl text-black">
        <h2 className="text-3xl font-bold mb-8">Our Tech Stack</h2>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-1024.png" alt="React Logo" className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xl text-white">React</p>
            </div>
            <div className="text-center">
              <img src="https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png" alt="OpenAI Logo" className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xl text-white">OpenAI</p>
            </div>
            <div className="text-center">
              <img src="https://static-00.iconduck.com/assets.00/nextjs-icon-2048x2048-eugu5rfi.png" alt="Next.js Logo" className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xl text-white">Next.js</p>
            </div>
            <div className="text-center">
              <img src="https://img.notionusercontent.com/s3/prod-files-secure%2F222ff4f6-9f64-41e1-a6d8-2d647b2d6baa%2F9cea144e-f80a-4de8-bcb9-b3f974262f9f%2Fimage.png/size/w=190?exp=1748204021&sig=YOc7eTn88UvDZLu1dK73g3_e-IiuB78qmYP7LfnxTVc&id=1fc85418-94b8-80f5-8956-c80358df725f&table=block" alt="DEX Logo" className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xl text-white">DEX</p>
            </div>
            <div className="text-center">
              <img src="https://www.aigcbb.com/wp-content/uploads/2025/04/1745758519-250427205457.png" alt="Trae Logo" className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xl text-white">Trae</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-16 w-full max-w-4xl text-black">
        <h2 className="text-3xl font-bold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQFU9R5jmQ0gQQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727719633179?e=1753315200&v=beta&t=ptG8zmzX9LjOXSs9I2aenwqZ4aZ1ZGG9H_A8sL3Mq5Q" alt="Avikalp Karrahe" className="w-24 h-24 mx-auto mb-2 rounded-full" />
            <p className="text-xl font-bold">Avikalp Karrahe</p>
            <p className="text-lg">Backend Engineer</p>
          </div>
          <div className="text-center">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQGrXv_nVqPg1g/profile-displayphoto-shrink_800_800/B4DZWD_J9kGkAc-/0/1741676126457?e=1753315200&v=beta&t=Kc_ywZ6xBhpiD1fxmeqDRPQQRkGiuOmKISSIXM9OTTc" alt="Yifei Li" className="w-24 h-24 mx-auto mb-2 rounded-full" />
            <p className="text-xl font-bold">Yifei Li</p>
            <p className="text-lg">Backend Engineer</p>
          </div>
          <div className="text-center">
            <img src="https://media.licdn.com/dms/image/v2/D4E03AQFyRHxOhlEwpA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727723187847?e=1753315200&v=beta&t=c3heZyGgs_t6gJrHP1kJBfNVTBg5cMmE1I4DX2Sil6I" alt="Rachel Guo" className="w-24 h-24 mx-auto mb-2 rounded-full" />
            <p className="text-xl font-bold">Rachel Guo</p>
            <p className="text-lg">Frontend Engineer</p>
          </div>
          <div className="text-center">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQHE0kzz5nGAWg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724565017033?e=1753315200&v=beta&t=1sTPcDd9_7r_EiQXYtNd04Vbrri4B25LJjrg-C4H1wM" alt="Chaitanya Khot" className="w-24 h-24 mx-auto mb-2 rounded-full" />
            <p className="text-xl font-bold">Chaitanya Khot</p>
            <p className="text-lg">UI/UX Lead</p>
          </div>
        </div>
      </section>
    </main>
  );
}
