import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Fuel,
  MapPin,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
  Zap,
} from "lucide-react";

const fuels = [
  { id: "regular", name: "Regular", detail: "87 octane", price: 3.49, color: "bg-[#f3b84d]", icon: "87" },
  { id: "premium", name: "Premium", detail: "93 octane", price: 4.09, color: "bg-[#ec8059]", icon: "93" },
  { id: "diesel", name: "Diesel", detail: "Ultra low sulfur", price: 3.89, color: "bg-[#6d8bd4]", icon: "D" },
];

const activity = [
  { name: "Regular", gallons: "12.4 gal", date: "Oct 18 · Honda CR-V", total: "$43.28", color: "bg-[#f3b84d]", mark: "87" },
  { name: "Premium", gallons: "10.0 gal", date: "Oct 04 · Honda CR-V", total: "$40.90", color: "bg-[#ec8059]", mark: "93" },
  { name: "Regular", gallons: "11.8 gal", date: "Sep 21 · Honda CR-V", total: "$41.30", color: "bg-[#f3b84d]", mark: "87" },
];

function Logo({ light = false }) {
  return (
    <a href="#home" className={`flex items-center gap-2.5 font-bold tracking-tight ${light ? "text-white" : "text-[#17231e]"}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-[#b9eb82] text-[#173c2c]">
        <Zap size={19} fill="currentColor" strokeWidth={2.2} />
      </span>
      <span className="text-[22px]">aptic<span className="text-[#63a576]">.</span></span>
    </a>
  );
}

function App() {
  const [selectedFuel, setSelectedFuel] = useState("regular");
  const [gallons, setGallons] = useState(12);
  const [location, setLocation] = useState("Brooklyn, NY");
  const [activeNav, setActiveNav] = useState("Overview");
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const chosenFuel = fuels.find((fuel) => fuel.id === selectedFuel) ?? fuels[0];
  const total = (chosenFuel.price * gallons).toFixed(2);
  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };
  const startOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const placeOrder = (event) => {
    event.preventDefault();
    if (!location.trim()) {
      showToast("Add a delivery address to continue.");
      return;
    }
    setModalOpen(true);
  };

  return (
    <div id="home" className="min-h-screen bg-[#f5f6f2]">
      <header className="sticky top-0 z-30 border-b border-[#e8ebe5] bg-[#f5f6f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {["How it works", "Fuel prices", "For business"].map((item) => (
              <a key={item} href={item === "Fuel prices" ? "#prices" : "#how-it-works"} className="text-[13px] font-medium text-[#68746c] transition hover:text-[#173c2c]">
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => showToast("Sign-in isn't enabled in this demo yet.")} className="rounded-full px-4 py-2.5 text-[13px] font-semibold text-[#46544a] transition hover:bg-white">Sign in</button>
            <button onClick={startOrder} className="flex items-center gap-2 rounded-full bg-[#1d4735] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#286145]">
              Get fuel <ArrowRight size={15} />
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center rounded-full border border-[#e1e6de] text-[#263b30] md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#e8ebe5] bg-[#f5f6f2] px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-[1320px] flex-col gap-4">
              <a onClick={() => setMenuOpen(false)} href="#how-it-works" className="py-1 text-sm text-[#526056]">How it works</a>
              <a onClick={() => setMenuOpen(false)} href="#prices" className="py-1 text-sm text-[#526056]">Fuel prices</a>
              <button onClick={() => { setMenuOpen(false); startOrder(); }} className="rounded-full bg-[#1d4735] px-5 py-3 text-sm font-semibold text-white">Get fuel</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-14 pt-9 sm:px-8 md:pb-20 md:pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-12">
          <div className="max-w-[620px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce8d8] bg-[#edf4e9] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[.13em] text-[#457352]">
              <span className="size-1.5 rounded-full bg-[#55a06b]" />
              A better way to refuel
            </div>
            <h1 className="max-w-[610px] text-[clamp(3.2rem,7.2vw,6.6rem)] font-semibold leading-[.93] tracking-[-.075em] text-[#17231e]">
              Fuel up.<br /><span className="font-serif font-medium italic text-[#4d8c62]">Stay put.</span>
            </h1>
            <p className="mt-7 max-w-[460px] text-[16px] leading-7 text-[#69756c] sm:text-[17px]">
              Skip the station. We bring quality fuel straight to your driveway, workplace, or wherever you park.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={startOrder} className="group flex items-center gap-3 rounded-full bg-[#1d4735] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(29,71,53,.17)] transition hover:-translate-y-0.5 hover:bg-[#286145]">
                Book a delivery <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </button>
              <a href="#how-it-works" className="flex items-center gap-2 rounded-full px-5 py-4 text-sm font-semibold text-[#425148] transition hover:bg-white">
                See how it works <ArrowDownRight size={15} />
              </a>
            </div>
            <div className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#d3a68a", "#78937c", "#e7bb79", "#9dabc0"].map((color, i) => <span key={color} className="grid size-8 place-items-center rounded-full border-2 border-[#f5f6f2] text-[10px] font-bold text-white" style={{ backgroundColor: color }}>{["J", "M", "A", "K"][i]}</span>)}
              </div>
              <p className="text-xs text-[#7b857d]"><span className="font-semibold text-[#425148]">2,400+ happy drivers</span> and counting</p>
            </div>
          </div>

          <div className="relative min-h-[370px] overflow-hidden rounded-[26px] bg-[#173b2d] sm:min-h-[470px] lg:min-h-[510px]">
            <div className="hero-grid fuel-glow absolute inset-0 opacity-80" />
            <div className="absolute left-7 top-7 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-medium text-white/85 backdrop-blur-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-[#b9eb82]" /> Delivering near you
            </div>
            <div className="absolute right-7 top-7 z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-[#d9f3c4]">
              <MapPin size={19} />
            </div>
            <div className="absolute left-1/2 top-[47%] z-10 w-[83%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative mx-auto aspect-[1.75/1] max-w-[410px]">
                <div className="absolute bottom-[8%] left-[5%] right-[4%] h-[28%] rounded-[50%] bg-black/25 blur-xl" />
                <svg viewBox="0 0 460 260" role="img" aria-label="Aptic fuel delivery van illustration" className="relative h-full w-full drop-shadow-[0_24px_24px_rgba(0,0,0,.2)]">
                  <path d="M66 70h214c11 0 20 9 20 20v92H48V88c0-10 8-18 18-18Z" fill="#f3f5e9" />
                  <path d="M300 111h65c9 0 17 4 22 11l34 45v15H300V111Z" fill="#e2eadb" />
                  <path d="M322 123h37c4 0 8 2 11 5l19 26h-67v-31Z" fill="#93b9a1" />
                  <path d="M48 154h373v34H48z" fill="#b9eb82" />
                  <path d="M66 70h214c11 0 20 9 20 20v11H48V88c0-10 8-18 18-18Z" fill="#fffdf5" />
                  <rect x="76" y="115" width="56" height="25" rx="8" fill="#173b2d" />
                  <path d="M83 133l9-15 9 15h-18Zm20 0 9-15 9 15h-18Z" fill="#b9eb82" />
                  <text x="146" y="134" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="700" fill="#173b2d">aptic</text>
                  <circle cx="119" cy="188" r="25" fill="#1d3028" /><circle cx="119" cy="188" r="12" fill="#c8d1c7" /><circle cx="354" cy="188" r="25" fill="#1d3028" /><circle cx="354" cy="188" r="12" fill="#c8d1c7" />
                  <path d="M424 165h9v12h-9z" fill="#f4ba56" /><path d="M48 164h-9v12h9z" fill="#e87865" />
                </svg>
                <div className="absolute -right-[1%] top-[12%] grid size-10 place-items-center rounded-full border border-[#d4f1b6]/40 bg-[#b9eb82]/20 text-[#d4f1b6]">
                  <Sparkles size={18} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-10 rounded-[18px] border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#b9eb82] text-[#173b2d]"><Truck size={20} /></div>
                  <div><p className="text-sm font-semibold text-white">Your fuel, en route</p><p className="mt-1 text-[11px] text-white/65">Contactless. Convenient. On your time.</p></div>
                </div>
                <div className="hidden text-right min-[400px]:block">
                  <p className="text-[10px] uppercase tracking-[.12em] text-white/55">Average arrival</p>
                  <p className="mt-1 text-sm font-semibold text-[#d4f1b6]">45–60 min</p>
                </div>
              </div>
            </div>
            <div className="absolute left-[8%] top-[34%] h-px w-[84%] rotate-[-13deg] bg-white/10" />
            <div className="absolute left-[14%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#b9eb82]/80 shadow-[0_0_16px_4px_rgba(185,235,130,.45)]" />
          </div>
        </section>

        <section className="border-y border-[#e7eae3] bg-white/65">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 divide-x divide-y divide-[#e7eae3] px-5 sm:px-8 md:grid-cols-4 md:divide-y-0 lg:px-12">
            {[
              { label: "Avg. delivery", value: "45 min", icon: Clock3 },
              { label: "Transparent pricing", value: "No surprises", icon: ShieldCheck },
              { label: "Fuel quality", value: "Top tier", icon: Sparkles },
              { label: "Your time saved", value: "2.5 hrs / mo", icon: Zap },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 py-5 sm:gap-4 sm:py-6 md:justify-center md:py-7">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#edf3e9] text-[#528161] sm:size-10"><Icon size={18} /></span>
                <div><p className="text-[10px] font-medium uppercase tracking-[.1em] text-[#8a938c]">{label}</p><p className="mt-1 text-sm font-semibold tracking-[-.02em] text-[#293b30]">{value}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="order" className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-24">
          <div className="pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#578367]">Fuel on your schedule</span>
            <h2 className="mt-4 max-w-[430px] text-4xl font-semibold leading-[1.08] tracking-[-.06em] text-[#17231e] sm:text-[52px]">A full tank, minus the detour.</h2>
            <p className="mt-5 max-w-[420px] text-[15px] leading-7 text-[#737f76]">Choose your fuel, tell us where to find you, and get back to what matters. It really is that simple.</p>
            <div className="mt-8 space-y-5">
              {[
                ["01", "Pick your fuel", "Regular, premium, or diesel. Your call."],
                ["02", "Choose a time", "We work around your day, not the other way around."],
                ["03", "Get on with it", "We fuel your vehicle safely while you do your thing."],
              ].map(([number, title, caption]) => (
                <div key={number} id={number === "02" ? "how-it-works" : undefined} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#dfe8dc] text-[10px] font-semibold text-[#548063]">{number}</span>
                  <div><h3 className="text-sm font-semibold text-[#344339]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#849087]">{caption}</p></div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={placeOrder} className="soft-shadow rounded-[24px] border border-[#e9ede6] bg-white p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><div className="flex items-center gap-2"><h3 className="text-[21px] font-semibold tracking-[-.04em] text-[#1d2c23]">Build your delivery</h3><span className="rounded-full bg-[#eff5eb] px-2 py-1 text-[9px] font-semibold uppercase tracking-[.1em] text-[#598164]">Demo</span></div><p className="mt-1.5 text-xs text-[#8a938d]">Your next fill-up is a few taps away.</p></div>
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#eff5eb] text-[#548063]"><Fuel size={19} /></div>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between"><label className="text-xs font-semibold text-[#455349]">Choose your fuel</label><span className="text-[10px] text-[#929a94]">Price per gallon</span></div>
              <div className="grid grid-cols-3 gap-2.5">
                {fuels.map((fuel) => (
                  <button type="button" key={fuel.id} onClick={() => setSelectedFuel(fuel.id)} className={`rounded-[14px] border p-3 text-left transition sm:p-3.5 ${selectedFuel === fuel.id ? "border-[#50805e] bg-[#f4f8f1] ring-1 ring-[#50805e]" : "border-[#ebeee9] hover:border-[#cbd9c9]"}`}>
                    <span className={`grid size-8 place-items-center rounded-[10px] text-[10px] font-bold text-white ${fuel.color}`}>{fuel.icon}</span>
                    <span className="mt-3 block text-[12px] font-semibold text-[#35433a]">{fuel.name}</span>
                    <span className="mt-1 block text-[10px] text-[#8b948d]">${fuel.price.toFixed(2)}<span className="hidden sm:inline"> / gal</span></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center justify-between"><label htmlFor="gallons" className="text-xs font-semibold text-[#455349]">How much?</label><span className="text-[10px] text-[#929a94]">Gallons</span></div>
                <div className="flex h-[54px] items-center justify-between rounded-[12px] border border-[#e8ece6] px-2.5">
                  <button type="button" onClick={() => setGallons(Math.max(1, gallons - 1))} className="grid size-8 place-items-center rounded-lg text-[#637168] transition hover:bg-[#f1f5ee]" aria-label="Remove one gallon"><Minus size={15} /></button>
                  <label htmlFor="gallons" className="flex items-baseline gap-1"><input id="gallons" type="number" min="1" max="100" value={gallons} onChange={(event) => setGallons(Math.min(100, Math.max(1, Number(event.target.value) || 1)))} className="w-12 bg-transparent text-center text-lg font-semibold text-[#25372c] outline-none" /><span className="text-xs text-[#89938b]">gal</span></label>
                  <button type="button" onClick={() => setGallons(Math.min(100, gallons + 1))} className="grid size-8 place-items-center rounded-lg text-[#637168] transition hover:bg-[#f1f5ee]" aria-label="Add one gallon"><Plus size={15} /></button>
                </div>
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between"><label htmlFor="location" className="text-xs font-semibold text-[#455349]">Delivery location</label><span className="text-[10px] text-[#929a94]">Your vehicle</span></div>
                <div className="flex h-[54px] items-center gap-2 rounded-[12px] border border-[#e8ece6] px-3">
                  <MapPin size={15} className="shrink-0 text-[#689073]" />
                  <input id="location" value={location} onChange={(event) => setLocation(event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs font-medium text-[#46544a] outline-none placeholder:text-[#a3aaa4]" placeholder="Street address or ZIP" />
                  <ChevronDown size={14} className="shrink-0 text-[#9aa39c]" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-dashed border-[#e6ebe4] pt-5">
              <div><p className="text-[10px] font-medium uppercase tracking-[.12em] text-[#8b958d]">Estimated total</p><p className="mt-1 text-[10px] text-[#929a94]">{gallons} gal × ${chosenFuel.price.toFixed(2)} / gal · delivery included</p></div>
              <p className="text-[28px] font-semibold tracking-[-.05em] text-[#1d3929]">${total}</p>
            </div>
            <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1d4735] py-4 text-sm font-semibold text-white transition hover:bg-[#286145]">
              Schedule my delivery <ArrowRight size={16} />
            </button>
            <p className="mt-3 text-center text-[10px] text-[#929a94]"><ShieldCheck size={12} className="mr-1 inline -translate-y-px" /> Secure checkout · No commitment until you confirm</p>
          </form>
        </section>

        <section id="prices" className="bg-[#1b3c2d]">
          <div className="mx-auto grid max-w-[1320px] gap-9 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-12">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#b9eb82]">Simple, upfront pricing</span>
              <h2 className="mt-3 max-w-[360px] text-[34px] font-semibold leading-[1.08] tracking-[-.06em] text-white sm:text-[42px]">Good fuel.<br />No guesswork.</h2>
              <p className="mt-4 max-w-[370px] text-sm leading-6 text-white/60">Sample prices for Brooklyn, NY. Your final price is confirmed before every delivery.</p>
              <p className="mt-5 flex items-center gap-1.5 text-[10px] text-white/45"><span className="size-1.5 rounded-full bg-[#b9eb82]" /> Sample local rates · Updated today</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {fuels.map((fuel, i) => (
                <div key={fuel.id} className={`rounded-[18px] border p-5 transition ${selectedFuel === fuel.id ? "border-[#b9eb82]/45 bg-white/[.1]" : "border-white/10 bg-white/[.045]"}`}>
                  <div className="flex items-center justify-between"><span className={`grid size-8 place-items-center rounded-[10px] text-[10px] font-bold text-white ${fuel.color}`}>{fuel.icon}</span>{i === 0 && <span className="rounded-full bg-[#b9eb82]/15 px-2 py-1 text-[9px] font-semibold text-[#b9eb82]">POPULAR</span>}</div>
                  <p className="mt-5 text-sm font-medium text-white/75">{fuel.name}</p>
                  <p className="mt-1 text-[28px] font-semibold tracking-[-.06em] text-white">${fuel.price.toFixed(2)}<span className="ml-1 text-[11px] font-normal tracking-normal text-white/45">/ gal</span></p>
                  <button onClick={() => { setSelectedFuel(fuel.id); startOrder(); }} className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#b9eb82] transition hover:text-white">Choose fuel <ArrowUpRight size={13} /></button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#598367]">Your fuel, your history</span><h2 className="mt-3 text-3xl font-semibold tracking-[-.055em] text-[#1d2b22] sm:text-[38px]">Made for your everyday.</h2></div>
            <button onClick={() => setShowAllActivity(!showAllActivity)} className="flex items-center gap-1.5 pb-1 text-xs font-semibold text-[#507c5d] transition hover:text-[#203d2c]">{showAllActivity ? "Show less" : "View all activity"} <ArrowRight size={14} className={`transition ${showAllActivity ? "rotate-180" : ""}`} /></button>
          </div>
          <div className="mt-7 overflow-hidden rounded-[18px] border border-[#e8ece5] bg-white">
            <div className="hidden grid-cols-[1.2fr_1fr_1.2fr_.7fr] gap-4 border-b border-[#edf0eb] bg-[#fafbf8] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[.13em] text-[#9aa29b] sm:grid"><span>Fuel type</span><span>Amount</span><span>Vehicle · date</span><span className="text-right">Total</span></div>
            {(showAllActivity ? [...activity, ...activity] : activity).map((item, index) => (
              <div key={`${item.date}-${index}`} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-[#edf0eb] px-4 py-4 last:border-0 sm:grid-cols-[1.2fr_1fr_1.2fr_.7fr] sm:gap-4 sm:px-6">
                <div className="flex items-center gap-3"><span className={`grid size-8 shrink-0 place-items-center rounded-[10px] text-[9px] font-bold text-white ${item.color}`}>{item.mark}</span><div><p className="text-xs font-semibold text-[#344238]">{item.name}</p><p className="mt-1 text-[10px] text-[#9aa29b] sm:hidden">{item.gallons} · {item.date}</p></div></div>
                <span className="hidden text-xs text-[#68756b] sm:block">{item.gallons}</span>
                <span className="hidden text-xs text-[#68756b] sm:block">{item.date}</span>
                <span className="text-right text-sm font-semibold text-[#344238]">{item.total}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
          <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 overflow-hidden rounded-[24px] bg-[#e8f0e2] p-7 sm:p-10 md:flex-row md:items-center">
            <div><span className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#628568]">A little more you-time</span><h2 className="mt-2 max-w-[530px] text-[30px] font-semibold leading-[1.1] tracking-[-.06em] text-[#1b3828] sm:text-[38px]">Your next stop doesn't have to be the gas station.</h2></div>
            <button onClick={startOrder} className="flex shrink-0 items-center gap-2 rounded-full bg-[#1d4735] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#286145]">Let's get started <ArrowRight size={16} /></button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e6eae3] bg-[#f1f3ee]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-5 px-5 py-7 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <div><Logo /><p className="mt-2 text-[10px] text-[#929a94]">Fuel, right on time. © {new Date().getFullYear()} Aptic.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-[#7a857c]"><a href="#how-it-works" className="hover:text-[#294b36]">How it works</a><a href="#prices" className="hover:text-[#294b36]">Fuel prices</a><button onClick={() => showToast("Thanks for reaching out — hello@aptic.example")} className="hover:text-[#294b36]">Contact</button><button onClick={() => showToast("Aptic keeps your vehicle and payment details secure.")} className="hover:text-[#294b36]">Privacy</button></div>
        </div>
      </footer>

      {toast && <div role="status" className="toast-enter fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#1d4735] px-5 py-3 text-xs font-medium text-white shadow-xl">{toast}</div>}

      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#10251b]/55 p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="max-h-[calc(100vh-2rem)] w-full max-w-[430px] overflow-y-auto rounded-[24px] bg-white p-7 shadow-2xl sm:p-9" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} className="ml-auto grid size-9 place-items-center rounded-full bg-[#f2f5ef] text-[#526056]" aria-label="Close dialog"><X size={17} /></button>
            <div className="mx-auto mt-1 grid size-14 place-items-center rounded-2xl bg-[#e8f4e1] text-[#4a8056]"><Check size={25} /></div>
            <div className="mt-5 text-center"><h2 id="modal-title" className="text-2xl font-semibold tracking-[-.05em] text-[#1d3024]">You're on your way.</h2><p className="mt-2 text-sm leading-6 text-[#768178]">Your Aptic delivery is ready to schedule. This is a demo, so no payment has been taken.</p></div>
            <div className="mt-6 rounded-[15px] bg-[#f6f8f4] p-4">
              <div className="flex items-center justify-between text-xs"><span className="text-[#788379]">{gallons} gal {chosenFuel.name}</span><span className="font-semibold text-[#314438]">${total}</span></div>
              <div className="mt-3 flex items-center justify-between border-t border-[#e7ece4] pt-3 text-xs"><span className="flex items-center gap-1.5 text-[#788379]"><MapPin size={13} /> {location}</span><span className="font-semibold text-[#4d7e58]">45–60 min</span></div>
            </div>
            <button onClick={() => { setModalOpen(false); showToast("Demo order confirmed — thanks for trying Aptic!"); }} className="mt-5 w-full rounded-full bg-[#1d4735] py-3.5 text-sm font-semibold text-white transition hover:bg-[#286145]">Confirm demo order</button>
            <button onClick={() => setModalOpen(false)} className="mt-3 w-full py-2 text-xs font-medium text-[#7f8a81] hover:text-[#33493a]">Go back and edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
