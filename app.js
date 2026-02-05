const properties = [
    {
        id: 1,
        title: "Ocean Breeze Villa",
        price: 4200000,
        formattedPrice: "$4,200,000",
        location: "Malibu, California",
        category: "beachfront",
        beds: 5,
        baths: 4,
        sqft: "4,500",
        hook: "Waterfront Paradise",
        status: "New Listing",
        description: "Perched on the cliffs of Malibu, this stunning glass-fronted villa offers panoramic views of the Pacific Ocean and direct access to a secluded beach.",
        features: ["Infinity Pool", "Smart Home", "Wine Cellar", "Private Beach Access"],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 2,
        title: "Skyline Penthouse",
        price: 2850000,
        formattedPrice: "$2,850,000",
        location: "Manhattan, New York",
        category: "penthouse",
        beds: 3,
        baths: 3,
        sqft: "2,800",
        hook: "City Life Redefined",
        status: "Price Reduced",
        description: "Experience the pinnacle of urban living in this duplex penthouse overlooking the Chrysler Building and Central Park.",
        features: ["Rooftop Terrace", "Concierge", "Chef's Kitchen", "Floor-to-ceiling Windows"],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 3,
        title: "Modern Alpine Retreat",
        price: 3100000,
        formattedPrice: "$3,100,000",
        location: "Aspen, Colorado",
        category: "mountain",
        beds: 4,
        baths: 5,
        sqft: "3,200",
        hook: "Mountain Luxury",
        status: "Exclusive",
        description: "A brutalist masterpiece set against snowy peaks. Features heated stone floors, an indoor-outdoor pool, and a custom-built cedar sauna.",
        features: ["Heated Floors", "Ski-in/Ski-out", "Sauna & Spa", "Outdoor Kitchen"],
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 4,
        title: "The Azure Residences",
        price: 2100000,
        formattedPrice: "$2,100,000",
        location: "Miami, Florida",
        category: "beachfront",
        beds: 3,
        baths: 2,
        sqft: "2,400",
        hook: "Coastal Chic",
        status: "Newly Finished",
        description: "Light-filled apartment in the heart of Miami Beach with high-end finishes and floor-to-ceiling glass walls.",
        features: ["Ocean View", "Poolside Cabana", "24/7 Security", "Gym Access"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 5,
        title: "Willow Creek Estate",
        price: 5400000,
        formattedPrice: "$5,400,000",
        location: "Napa Valley, California",
        category: "mountain",
        beds: 6,
        baths: 7,
        sqft: "7,200",
        hook: "Vineyard Paradise",
        status: "Hidden Gem",
        description: "Expansive estate situated among world-class vineyards with a private guest house and a 2,000 bottle wine vault.",
        features: ["Vineyard", "Guest House", "Wine Vault", "Tennis Court"],
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 6,
        title: "The Vertex Residences",
        price: 1500000,
        formattedPrice: "From $1,500,000",
        location: "Austin, Texas",
        category: "development",
        beds: 2,
        baths: 2,
        sqft: "1,800",
        hook: "Coming Soon 2024",
        status: "Pre-Sale",
        description: "Austin's most ambitious residential tower with sustainable architecture, smart home tech, and a rooftop forest.",
        features: ["Solar Glass", "EV Charging", "Co-working Lounge", "Sky Park"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
    }
];

let wishlist = JSON.parse(localStorage.getItem('luxe_wishlist')) || [];

function toggleFAQ(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    
    // Toggle current
    if (!isActive) {
        item.classList.add('active');
    }
}

function toggleWishlist(id, event) {
    if (event) event.stopPropagation();
    const index = wishlist.indexOf(id);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast("Removed from favorites", "info");
    } else {
        wishlist.push(id);
        showToast("Added to favorites!", "success");
    }
    localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
    renderProperties();
}

function renderProperties(customList = null) {
    const grid = document.getElementById('property-grid');
    if (!grid) return;

    const filter = grid.getAttribute('data-filter') || 'all';
    const dataToRender = customList || (filter === 'all' ? properties : properties.filter(p => p.category === filter));

    grid.innerHTML = dataToRender.length ? dataToRender.map(prop => {
        const isFav = wishlist.includes(prop.id);
        return `
            <div class="property-card group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer" onclick="openModal(${prop.id})">
                <div class="relative h-72 overflow-hidden">
                    <img src="${prop.image}" alt="${prop.title}" class="property-image w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="absolute top-4 left-4 flex gap-2">
                        <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">${prop.status}</span>
                    </div>
                    <div class="absolute top-4 right-4">
                        <button onclick="toggleWishlist(${prop.id}, event)" class="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <i class="${isFav ? 'fas' : 'far'} fa-heart ${isFav ? 'text-red-500' : 'text-gray-400'}"></i>
                        </button>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="quick-view-btn bg-white text-blue-900 px-6 py-3 rounded-full font-bold shadow-xl">Quick Look</div>
                    </div>
                </div>
                <div class="p-8">
                    <p class="text-blue-500 text-xs font-bold uppercase tracking-widest mb-2">${prop.hook}</p>
                    <h3 class="text-2xl font-bold text-gray-900">${prop.title}</h3>
                    <p class="text-gray-500 text-sm mb-6"><i class="fas fa-map-marker-alt mr-2"></i> ${prop.location}</p>
                    <div class="flex justify-between border-t border-gray-100 pt-6 text-gray-600 font-medium text-sm">
                        <span>${prop.beds} Beds</span>
                        <span>${prop.baths} Baths</span>
                        <span class="font-bold text-blue-600">${prop.formattedPrice}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('') : '<p class="col-span-full text-center py-20 text-gray-400">No matching properties found.</p>';
}

function handleSearch() {
    const category = document.getElementById('search-category')?.value || 'all';
    const query = document.querySelector('input[placeholder*="Where"]')?.value.toLowerCase() || '';
    
    const isHome = !['penthouses', 'beachfront', 'developments', 'contact', 'reports', 'mountains'].some(p => window.location.pathname.includes(p));

    if (isHome) {
        let filtered = properties;
        if (category !== 'all') filtered = filtered.filter(p => p.category === category);
        if (query) filtered = filtered.filter(p => p.location.toLowerCase().includes(query) || p.title.toLowerCase().includes(query));
        renderProperties(filtered);
        document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = category === 'all' ? 'index.html' : `${category}s.html`;
    }
}

function openModal(id) {
    const prop = properties.find(p => p.id === id);
    if (!prop) return;
    const modal = document.getElementById('property-modal');
    const content = document.getElementById('modal-content');
    
    const monthlyPayment = Math.round((prop.price * 0.8) * (0.065 / 12) / (1 - Math.pow(1 + 0.065/12, -360)));

    content.innerHTML = `
        <button onclick="closeModal()" class="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"><i class="fas fa-times"></i></button>
        <div class="flex flex-col lg:flex-row h-full">
            <div class="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                <img src="${prop.image}" class="w-full h-full object-cover" />
            </div>
            <div class="lg:w-1/2 p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
                <div class="flex items-center gap-4 mb-4">
                    <span class="text-blue-600 font-bold uppercase tracking-widest text-xs">${prop.status}</span>
                    <span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">${prop.category}</span>
                </div>
                <h2 class="text-4xl font-bold text-gray-900 mt-2">${prop.title}</h2>
                <p class="text-gray-500 text-lg mb-4"><i class="fas fa-map-marker-alt mr-2"></i> ${prop.location}</p>
                
                <div class="flex gap-8 mb-8 pb-8 border-b border-gray-100">
                    <div><p class="text-xs text-gray-400 font-bold uppercase">Beds</p><p class="text-xl font-bold">${prop.beds}</p></div>
                    <div><p class="text-xs text-gray-400 font-bold uppercase">Baths</p><p class="text-xl font-bold">${prop.baths}</p></div>
                    <div><p class="text-xs text-gray-400 font-bold uppercase">Sq Ft</p><p class="text-xl font-bold">${prop.sqft}</p></div>
                </div>

                <div class="bg-blue-50 p-6 rounded-2xl mb-8">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-blue-900 font-bold text-2xl">${prop.formattedPrice}</span>
                        <span class="text-blue-600 text-sm font-medium">Est. $${monthlyPayment.toLocaleString()}/mo</span>
                    </div>
                    <p class="text-blue-700/70 text-xs">6.5% interest, 20% down, 30-year fixed</p>
                </div>

                <p class="text-gray-600 leading-relaxed mb-8">${prop.description}</p>
                
                <h4 class="font-bold text-gray-900 mb-4 uppercase tracking-widest text-sm">Key Features</h4>
                <div class="grid grid-cols-2 gap-3 mb-8">
                    ${prop.features.map(f => `<div class="flex items-center text-sm text-gray-600"><i class="fas fa-check text-blue-500 mr-2"></i> ${f}</div>`).join('')}
                </div>
                
                <div class="flex flex-col gap-3">
                    <button onclick="window.location.href='contact.html'" class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">Schedule Private Tour</button>
                    <button onclick="toggleWishlist(${prop.id})" class="w-full bg-gray-100 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all">
                        <i class="${wishlist.includes(prop.id) ? 'fas' : 'far'} fa-heart mr-2"></i> 
                        ${wishlist.includes(prop.id) ? 'Saved to Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.add('show'); document.body.classList.add('modal-open'); }, 10);
}

function closeModal() {
    const modal = document.getElementById('property-modal');
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => { modal.classList.add('hidden'); document.body.classList.remove('modal-open'); }, 300);
}

async function handleNewsletter(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]')?.value;
    const button = form.querySelector('button');
    if (!email) return;

    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Joining...';

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        form.innerHTML = `
            <div class="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl text-center animate-fade-in">
                <i class="fas fa-check-circle text-blue-500 text-2xl mb-2"></i>
                <p class="text-white font-bold text-sm">You\'re on the list!</p>
            </div>
        `;
        showToast(`Success! ${email} subscribed.`);
    } catch (error) {
        button.disabled = false;
        button.innerHTML = originalText;
        showToast("Something went wrong.", "error");
    }
}

function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-8 right-8 z-[200] px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 text-white transform transition-all duration-300 translate-y-10 opacity-0 bg-gray-900`;
    const icon = type === 'success' ? 'fa-check-circle text-blue-500' : (type === 'error' ? 'fa-exclamation-circle text-red-500' : 'fa-info-circle text-blue-400');
    toast.innerHTML = `<i class="fas ${icon}"></i> <span class="font-medium">${message}</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.classList.remove('translate-y-10', 'opacity-0'); });
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

window.toggleFAQ = toggleFAQ;

document.addEventListener('DOMContentLoaded', () => {
    renderProperties();
    document.getElementById('property-modal')?.addEventListener('click', (e) => { if (e.target.id === 'property-modal') closeModal(); });
});