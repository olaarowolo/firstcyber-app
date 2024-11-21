<header class="w-full bg-[url('assets/img/cs-img-bg.jpg')] bg-cover bg-bottom relative">
    <div class="w-full min-h-screen md:w-1/2 bg-black p-10 flex">
        <div class="flex-center" style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%);">
            <img class="logo" src="{{ asset('assets/img/fci-logo.png') }}" alt="First Cyber Instinct Logo"
                style="filter: invert(1);">
        </div>

        <div class="w-full text-center my-auto">


            <h1 class=" pt font-bold text-5xl font-Comforter-Brush text-amber-500 mb-10 md:text-right"></h1>
            <h6
                class="font-Montserrat font-bold uppercase text-4xl md:text-5xl lg:text-6xl mb-14 md:-mr-40 text-white md:text-right">
                Coming <span class="text-white/70 md:-mr-20">soon</span></h6>


            <!-- Count down -->
            @include('partials.countdown')


            <!-- Content -->
            <p class="text-base mb-20 text-gray-200 md:text-right" style="font-size: larger;">
                First Cyber Instinct, incorporated in November 2018, is a leading Managed Security Service
                Provider (MSSP) based in London. <br>
                <br> We are dedicated to delivering top-tier cybersecurity solutions and training. Our expertise
                spans across Cloud Security Architecture, Internal Audit, ISO 27001, ITIL, CIH, and Computer
                Forensics.

                <br>
                <br>
                Our mission is to enhance cybersecurity awareness and protect organizations from emerging
                threats through comprehensive consultancy and training services.


            </p>

            <!-- Social media -->
            @include('partials.social-media')



        </div>
    </div>
</header>