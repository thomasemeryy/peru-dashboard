import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Calendar, MapPin, Mountain, Plane, Bus, Coffee, Edit2, Save, X, 
  Download, Plus, Trash2, Users, Sun, Moon, LayoutDashboard, 
  Map as MapIcon, Wallet, Notebook, CheckSquare, AlertCircle,
  ExternalLink, Navigation, Calculator as CalcIcon, Grid, List, 
  Upload, Share2, Tent, Landmark, Palmtree, ArrowRight, ArrowDown, ArrowLeft,
  Ship, Clock, Footprints, Ticket, Image as ImageIcon, NotebookPen
} from 'lucide-react';

// --- INITIAL DATA ---
const INITIAL_ITINERARY = [
  {
    day: 1,
    date: "Sun 5th July 2026",
    location: "UK to Lima",
    category: "Travel",
    altitude: "",
    activity: "Depart London for Colombia!",
    travelStats: [{ mode: 'Plane', time: '22:05', details: 'Flight AV121' }],
    accommodation: "Overnight: Plane",
    notes: "Meet at airport 3 hours prior.",
    coords: { x: 15, y: 15 },
    img: "https://s28477.pcdn.co/wp-content/uploads/2017/10/Avianca_1.jpg"
  },
  {
    day: 2,
    date: "Mon 6th July 2026",
    location: "Lima",
    category: "Travel",
    altitude: "",
    activity: "Arrive in Colombia (El Dorado) at 03:00am. Three hour layover, before another flight to Peru (Lima), arriving 09:30am.",
    travelStats: [{mode: 'Plane', time: '06:25', details: 'Flight AV49'}],
    accommodation: "Overnight: Hostel",
    notes: "Spend the day exploring Lima - could organise a guided tour",
    coords: { x: 18, y: 55 },
    img: "https://dynamic-media.tacdn.com/media/photo-o/2f/ba/e1/6f/caption.jpg?w=2400&h=-1&s=1"
  },
  {
    day: 3,
    date: "Tue 7th July 2026",
    location: "Lima to Cusco",
    category: "Travel",
    altitude: "3400m",
    activity: "Take a flight to Cusco, arriving 09:25am. Packed breakfast provided for transfer to airport.",
    travelStats: [{ mode: 'Bus', time: '05:00', details: 'Airport Transfer' }, { mode: 'Plane', time: '08:05', details: 'Flight LA2130' }],
    accommodation: "Overnight: Hostel",
    notes: "Explore Cusco with guided tour to acclimatise.",
    coords: { x: 68, y: 72 },
    img: "https://www.peruforless.com/_next/image?url=https%3A%2F%2Fwww.peruforless.com%2Fimages%2Ftg-cusco-top-mobile.jpg&w=3840&q=75"
  },
  {
    day: 4,
    date: "Wed 8th July 2026",
    location: "Cusco to Patabamba",
    category: "Trek",
    altitude: "3800m",
    activity: "Begin trek to Patabamba.",
    travelStats: [{ mode: 'Trek', time: '4 hrs', details: 'Trek' }],
    accommodation: "Overnight: Guesthouse",
    notes: "Given a lesson on medicinal herbs used in the community.",
    coords: { x: 69, y: 70 },
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_8_qwXeuo3727rApWvvDyclmL6QuhkLuXA&s"
  },
  {
    day: 5,
    date: "Thu 9th July 2026",
    location: "Patabamba to Sihua",
    category: "Project",
    altitude: "2900m",
    activity: "Trek to project site in Sihua, crossing a hanging Inca bridge on the way.",
    travelStats: [{ mode: 'Trek', time: '4 hrs', details: 'Trek' }],
    accommodation: "Overnight: Local Guesthouse (2-4 people/room)",
    notes: "Meet community and get an explanation of how the project works.",
    coords: { x: 70, y: 69 },
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Sihuas01.jpg"
  },
  {
    day: 6,
    date: "Fri 10th July 2026",
    location: "Sihua",
    category: "Project",
    altitude: "2900m",
    activity: "Engage in project work - improving sanitrary facilities of three families.",
    travelStats: [],
    accommodation: "Overnight: Local Guesthouse",
    notes: "",
    coords: { x: 70, y: 69 },
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGG1dL92Bspvd16kHmus5bdpvdt-e2zE-MtA&s"
  },
  {
    day: 7,
    date: "Sat 11th July 2026",
    location: "Sihua",
    category: "Project",
    altitude: "2900m",
    activity: "Engage in project work - improving sanitrary facilities of three families.",
    travelStats: [],
    accommodation: "Overnight: Local Guesthouse",
    notes: "",
    coords: { x: 70, y: 69 },
    img: "https://media-cdn.tripadvisor.com/media/photo-s/1d/7d/d8/c0/huchuy-qosqo-little-cusco.jpg"
  },
  {
    day: 8,
    date: "Sun 12th July 2026",
    location: "Sihua",
    category: "Project",
    altitude: "2900m",
    activity: "Engage in project work - improving sanitrary facilities of three families.",
    travelStats: [],
    accommodation: "Overnight: Local Guesthouse",
    notes: "",
    coords: { x: 68, y: 72 },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/CALCA.jpg/760px-Mapcarta.jpg"
  },
  {
    day: 9,
    date: "Mon 13th July 2026",
    location: "Sihua to Cusco",
    category: "Rest",
    altitude: "3400m",
    activity: "Say goodbye to community and transfer back to Cusco.",
    travelStats: [{ mode: 'Bus', time: 'Time TBC', details: 'Private Transfer' }],
    accommodation: "Overnight: Hostel in Cusco",
    notes: "Free time to plan activities!",
    coords: { x: 68, y: 72 },
    img: "https://cuscoperu.b-cdn.net/wp-content/uploads/2024/04/Cusco-dia.jpg"
  },
  {
    day: 10,
    date: "Tue 14th July 2026",
    location: "Cusco to Soraypampa",
    category: "Trek",
    altitude: "3900m",
    activity: "Wake up, breakfast then head to Challachanca to begin trek to Soraypampa. Have lunch and rest, then ascend to the jewel of the mountain - the Humantay Lake. Then descend for dinner and sleep.",
    travelStats: [{ mode: 'Trek', time: '3 hrs', details: 'Morning' }, { mode: 'Trek', time: '5 hrs', details: 'Afternoon' }],
    accommodation: "Camping: Sky Camp",
    notes: "Stay in unique Sky Camp pods - look them up!",
    coords: { x: 66, y: 71 },
    img: "https://www.incatrailmachu.com/img/humantay-lake-peru-000.jpg"
  },
  {
    day: 11,
    date: "Wed 15th July 2026",
    location: "Soraypampa to Pampajaponesa",
    category: "Trek",
    altitude: "4750m",
    activity: "Start trekking towards Salkantaypampa. Continue to Ichupata for lunch, then reach campsite in Pampajaponesa for dinner.",
    travelStats: [{ mode: 'Trek', time: '10km', details: 'All day' }],
    accommodation: "Camping: Campsite",
    notes: "A difficult trek due to the gradient and altitude.",
    coords: { x: 65, y: 70 },
    img: "https://www.cuscoexplorer.com/wp-content/uploads/2019/10/ruta-exclusiva-salkantay-caminata-terra-explorer-800x600.jpg"
  },
  {
    day: 12,
    date: "Thu 16th July 2026",
    location: "Pampajaponesa to Paucarcancha",
    category: "Trek",
    altitude: "3120m",
    activity: "Head to the highest point of Incachiriaska Pass, enjoying the views of the snow-capped mountains and clear waters, before descending to Yanacaca for lunch. Continue descending to reach camp at Paucarchanca.",
    travelStats: [{ mode: 'Trek', time: '15km', details: 'All day' }],
    accommodation: "Camping: Campsite",
    notes: "Toughest day of the hike due to the altitude.",
    coords: { x: 64, y: 69 },
    img: "https://www.caminoincamachu.com/wp-content/uploads/2023/12/paucarcancha.jpg"
  },
  {
    day: 13,
    date: "Fri 17th July 2026",
    location: "Paucarcancha to Ayapata",
    category: "Trek",
    altitude: "3300m",
    activity: "Get the feeling of going back in time as we go to visit the Inca site, before heading towards the classic Inca Trail for lunch. Continue through stunning landscapes to reach camp.",
    travelStats: [{ mode: 'Trek', time: '5km', details: 'All day' }],
    accommodation: "Camping: Campsite",
    notes: "Learn about the history at the Inca site.",
    coords: { x: 63, y: 68 },
    img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Incatrail_in_Peru.jpg"
  },
  {
    day: 14,
    date: "Sat 18th July 2026",
    location: "Ayapata to Chaquicocha",
    category: "Trek",
    altitude: "3600m",
    activity: "Move up to Dead Woman's Pass, then head to lunch before seeing the archaeological site of Runkuraqay. Trek the pass, and then visit another site called Sayacmarca before hiking to camp for dinner and rest.",
    travelStats: [{ mode: 'Trek', time: '16km', details: 'All day' }],
    accommodation: "Camping: Campsite",
    notes: "Learn about Inca history at Runkuraqay and Sayacmarca.",
    coords: { x: 62.5, y: 68 },
    img: "https://www.incatrail.org/images/attractions/runkuraqay.jpg"
  },
  {
    day: 15,
    date: "Sun 19th July 2026",
    location: "Chaquicocha to Wiñay Wayna",
    category: "Trek",
    altitude: "3400m",
    activity: "A more leisurely hike to visit archaeological sites of Phuyapatamarca and Intipata, enjoying fantastic views of the Sacred Valley. Head down to lunch and camp.",
    travelStats: [{ mode: 'Trek', time: '9km', details: 'Morning' }],
    accommodation: "Camping: Campsite",
    notes: "Rest and shower, or visit another archaeological site. Celebrate end of hike and say goodbye to porters and cooks.",
    coords: { x: 62, y: 67.5 },
    img: "https://www.tierrasvivas.com/img/winaywayna-276.jpg"
  },
  {
    day: 16,
    date: "Mon 20th July 2026",
    location: "Wiñay Wayna to Cusco",
    category: "Highlight",
    altitude: "3400m",
    activity: "Prepare for one of the seven Wonders of the World! Reach the Sun Gate - the first view of the citadel. Admire the Inca architecture and take photos on the upper terraces. Take the bus to Aguas Calientes, have lunch, then take the train to Ollantaytambo to be picked up and return to Cusco.",
    travelStats: [
      { mode: 'Trek', time: '2 hrs', details: 'Early morning' },
      { mode: 'Bus', time: 'PM', details: 'Aguas Calientes' },
      { mode: 'Train', time: 'PM', details: 'Ollantaytambo' },
      { mode: 'Bus', time: 'PM', details: 'Cusco' }
    ],
    accommodation: "Overnight: Hotel?",
    notes: "There may be time to visit the hot springs, which the budget could be spent on. Dinner plans need to be decided as a team.",
    coords: { x: 61.5, y: 67 },
    img: "https://www.machupicchureservations.org/wp-content/themes/machupicchureservations-child/images/placeholder_mobile.jpg"
  },
  {
    day: 17,
    date: "Tue 21st July 2026",
    location: "Cusco to Llachon",
    category: "Culture",
    altitude: "3800m",
    activity: "Enjoy breakfast, then transfer to Llachon, visiting Raqchi on the way. Spend time with Camelid breeding program. Stay on island of Llachon.",
    travelStats: [{ mode: 'Bus', time: 'Day', details: 'Tour Bus' }],
    accommodation: "Overnight: Island (home stay?)",
    notes: "Learn about feeding, wool shearing, care and cultural roles of Camelids with local community.",
    coords: { x: 75, y: 80 },
    img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/311494840.jpg?k=a5aaa2a1983fce92c9f7c052c392cf58a309fc516a32eb2d8786ee5a1772548a&o="
  },
  {
    day: 18,
    date: "Wed 22nd July 2026",
    location: "Llachon to Taquile",
    category: "Culture",
    altitude: "3950m",
    activity: "After breakfast, take boat to Taquile island and explore on foot.",
    travelStats: [{ mode: 'Boat', time: 'Morning', details: 'Taquile Island' }],
    accommodation: "Overnight: Taquile",
    notes: "Breakfast and dinner included.",
    coords: { x: 78, y: 81 },
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/a7/44/1e/blue-lake-view.jpg?w=1200&h=-1&s=1"
  },
  {
    day: 19,
    date: "Thu 23rd July 2026",
    location: "Taquile to Puno",
    category: "Travel",
    altitude: "3800m",
    activity: "After breakfast, take boat to Uros Islands and explore floating islands, before taking bus to Puno. Catch night bus to Lima.",
    travelStats: [{ mode: 'Boat', time: 'Morning', details: 'Uros Islands' }, { mode: 'Bus', time: 'Afternoon', details: 'Puno' }, { mode: 'Bus', time: 'Night', details: 'Lima' }],
    accommodation: "Overnight: Night bus",
    notes: "Look forward to sleeping on a bus!",
    coords: { x: 77, y: 82 },
    img: "https://www.salkantaytrekking.com/blog/wp-content/uploads/2024/11/Uros-Island-1024x683.jpg"
  },
  {
    day: 20,
    date: "Fri 24th July 2026",
    location: "Puno to Lima",
    category: "Travel",
    altitude: "150m",
    activity: "Arrive in Lima, enjoy breakfast then transfer to hostel to enjoy an afternoon of sightseeing.",
    travelStats: [{ mode: 'Bus', time: 'Morning', details: 'Wake up!' }, { mode: 'Bus', time: 'Morning', details: 'Hostel transfer' }],
    accommodation: "Overnight: Hostel",
    notes: "Organise a final celebratory meal to reflect on the trip!",
    coords: { x: 18, y: 55 },
    img: "https://www.salkantaytrekmachu.com/img/lima-peru-where-tradition-is-a-trend-292.jpg"
  },
  {
    day: 21,
    date: "Sat 25th July 2026",
    location: "Lima",
    category: "Free Time",
    altitude: "150m",
    activity: "Source breakfast, and enjoy final sightseeing and shopping opportunities. Depart Lima, arrive in El Dorda at 21:55pm. Then depart Colombia at 23:25pm.",
    travelStats: [{ mode: 'Plane', time: '18:45pm', details: 'Flight AV52' }, { mode: 'Plane', time: '23:25pm', details: 'Flight AV120' }],
    accommodation: "Overnight: Plane",
    notes: "Arrive at airport 3hrs before departure.",
    coords: { x: 18, y: 55 },
    img: "https://trexperienceperu.com/sites/default/files/cusco-airport-airplane.webp"
  },
  {
    day: 22,
    date: "Sun 26th July 2026",
    location: "Lima to UK",
    category: "Travel",
    altitude: "",
    activity: "Arrive home at 15:35pm!",
    travelStats: [{ mode: 'Bus', time: 'PM', details: 'Transfer home' }],
    accommodation: "Overnight: Home!",
    notes: "Welcome back!",
    coords: { x: 15, y: 15 },
    img: "https://eu-assets.simpleview-europe.com/southeast/imageresizer/?image=%2Fdmsimgs%2Fgodalming_2098746192.jpg&action=ProductDetailEssentials"
  }
];

// --- SUB COMPONENTS ---

const CategoryBadge = ({ category }) => {
  const colors = {
    Travel: "bg-blue-100 text-blue-800 border-blue-200",
    Trek: "bg-green-100 text-green-800 border-green-200",
    Project: "bg-orange-100 text-orange-800 border-orange-200",
    Arrival: "bg-purple-100 text-purple-800 border-purple-200",
    Rest: "bg-gray-100 text-gray-800 border-gray-200",
    Highlight: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Culture: "bg-pink-100 text-pink-800 border-pink-200",
    "Free Time": "bg-indigo-100 text-indigo-800 border-indigo-200",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[category] || "bg-gray-100"}`}>
      {category}
    </span>
  );
};

const TravelTile = ({ mode, time, details }) => {
  const getIcon = () => {
    switch (mode) {
      case 'Plane': return <Plane size={14} />;
      case 'Bus': return <Bus size={14} />;
      case 'Trek': return <Footprints size={14} />;
      case 'Boat': return <Ship size={14} />;
      case 'Train': return <Ticket size={14} />;
      default: return <Navigation size={14} />;
    }
  };

  const colors = {
    Plane: 'bg-sky-50 text-sky-700 border-sky-100',
    Bus: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Trek: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Boat: 'bg-blue-50 text-blue-700 border-blue-100',
    Train: 'bg-rose-50 text-rose-700 border-rose-100'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-lg border ${colors[mode] || 'bg-stone-50 text-stone-600'} min-w-[80px] text-center shadow-sm`}>
      <div className="mb-1 opacity-80">{getIcon()}</div>
      <div className="text-xs font-bold leading-none mb-0.5">{time}</div>
      <div className="text-[10px] opacity-75 whitespace-nowrap">{details}</div>
    </div>
  );
};

// --- CALCULATOR COMPONENT ---
const Calculator = ({ onAddExpense }) => {
  const [display, setDisplay] = useState('0');
  const [description, setDescription] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);

  const handleDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);
    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setValue(newValue);
      setDisplay(String(newValue));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (left, right, op) => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
      default: return right;
    }
  };

  const handleEqual = () => {
    if (!operator) return;
    const inputValue = parseFloat(display);
    const newValue = calculate(value, inputValue, operator);
    setValue(null);
    setOperator(null);
    setWaitingForOperand(true);
    setDisplay(String(newValue));
  };

  const handleClear = () => {
    setDisplay('0');
    setValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      alert("Please add a description first!");
      return;
    }
    const cost = parseFloat(display);
    if (cost <= 0) return;
    
    onAddExpense({ desc: description, cost: cost });
    setDescription('');
    handleClear();
  };

  return (
    <div className="w-full max-w-md bg-stone-800 p-6 rounded-2xl shadow-2xl mx-auto">
      <div className="mb-4">
        <label className="text-stone-400 text-xs uppercase font-bold tracking-wider mb-1 block">Expense Description</label>
        <input 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Lunch at Machu Picchu" 
          className="w-full bg-stone-700 text-white p-3 rounded-lg border border-stone-600 focus:border-orange-500 focus:outline-none placeholder-stone-500"
        />
      </div>

      <div className="bg-stone-900 p-4 rounded-lg mb-4 text-right text-white font-mono text-4xl h-20 flex items-center justify-end overflow-hidden border border-stone-700">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <button onClick={handleClear} className="col-span-3 bg-stone-600 text-white p-4 rounded-lg hover:bg-stone-500 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">C</button>
        <button onClick={() => handleOperator('/')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-500 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">÷</button>
        
        {[7, 8, 9].map(n => <button key={n} onClick={() => handleDigit(n)} className="bg-stone-700 text-white p-4 rounded-lg hover:bg-stone-600 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">{n}</button>)}
        <button onClick={() => handleOperator('*')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-500 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">×</button>
        
        {[4, 5, 6].map(n => <button key={n} onClick={() => handleDigit(n)} className="bg-stone-700 text-white p-4 rounded-lg hover:bg-stone-600 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">{n}</button>)}
        <button onClick={() => handleOperator('-')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-500 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">-</button>
        
        {[1, 2, 3].map(n => <button key={n} onClick={() => handleDigit(n)} className="bg-stone-700 text-white p-4 rounded-lg hover:bg-stone-600 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">{n}</button>)}
        <button onClick={() => handleOperator('+')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-500 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">+</button>
        
        <button onClick={() => handleDigit(0)} className="col-span-2 bg-stone-700 text-white p-4 rounded-lg hover:bg-stone-600 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">0</button>
        <button onClick={() => handleDigit('.')} className="bg-stone-700 text-white p-4 rounded-lg hover:bg-stone-600 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">.</button>
        <button onClick={handleEqual} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-500 font-bold text-xl shadow-md active:transform active:scale-95 transition-all">=</button>
      </div>
      
      <button 
        onClick={handleSubmit}
        className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors flex justify-center items-center gap-2 shadow-lg active:transform active:scale-95"
      >
        <Plus size={24} /> ADD EXPENSE
      </button>
    </div>
  );
};

// --- ELEVATION GRAPH ---
const TimelineScrubber = ({ itinerary, currentDay, onDayChange }) => {
  const containerRef = useRef(null);
  const rawData = useMemo(() => itinerary.map(d => ({
    day: d.day,
    alt: (d.altitude && d.altitude !== "Sea Level") ? parseInt(d.altitude.replace(/[^0-9]/g, '')) : 0,
  })), [itinerary]);
  const minAlt = 150; 
  const maxAlt = 5200; 
  const data = rawData.map(d => ({ ...d, clampedAlt: d.alt < minAlt ? minAlt : d.alt }));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const normalizedHeight = (d.clampedAlt - minAlt) / (maxAlt - minAlt);
    const y = 100 - (normalizedHeight * 100);
    return `${x},${y}`;
  }).join(' ');
  const areaPath = `M 0,100 ${points} 100,100 Z`;
  const handleInteraction = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    const dayIndex = Math.round(percent * (data.length - 1));
    const day = itinerary[dayIndex].day;
    onDayChange(day);
  };
  const currentX = ((currentDay - 1) / (data.length - 1)) * 100;
  
  return (
    <div className="bg-stone-900 p-4 rounded-xl border border-stone-700 shadow-xl mt-4 flex gap-4">
      <div className="flex flex-col justify-between text-[10px] text-stone-500 font-mono py-1 text-right w-12 flex-shrink-0">
        <span>5200m</span>
        <span>4000m</span>
        <span>2500m</span>
        <span>150m</span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-white font-bold text-sm flex items-center gap-2"><Mountain size={16} className="text-emerald-500"/> Elevation Profile</h3>
          <span className="text-emerald-400 text-xs font-mono">Day {currentDay}: {itinerary[currentDay-1].altitude}</span>
        </div>
        <div ref={containerRef} className="relative h-32 w-full cursor-crosshair group border-b border-l border-stone-700" onMouseMove={(e) => e.buttons === 1 && handleInteraction(e)} onClick={handleInteraction}>
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{stopColor:"#10b981", stopOpacity:0.6}} /><stop offset="100%" style={{stopColor:"#10b981", stopOpacity:0.1}} /></linearGradient>
            </defs>
            <line x1="0" y1="25" x2="100" y2="25" stroke="#333" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#333" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#333" strokeWidth="0.5" strokeDasharray="2" />
            <path d={areaPath} fill="url(#grad)" stroke="none" />
            <polyline points={points} fill="none" stroke="#10b981" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none transition-all duration-75" style={{ left: `${currentX}%` }}><div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div></div>
        </div>
      </div>
    </div>
  );
};

// Map Component
const MapView = ({ itinerary }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const selectedDayData = itinerary.find(d => d.day === currentDay);
  const handleOpenGoogleMaps = (location) => {
    const query = encodeURIComponent(`${location} Peru`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="bg-stone-900 rounded-xl overflow-hidden shadow-lg border border-stone-800 relative flex-grow min-h-[500px]" style={{ background: "linear-gradient(to bottom right, #1a2e1a, #0d1f2d)" }}>
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20 pointer-events-none"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noise)" opacity="0.5"/></svg>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-30"><path d="M 15 25 L 30 15 L 50 20 L 80 20 L 90 45 L 95 65 L 80 90 L 65 95 L 45 90 L 25 75 L 15 55 Z" fill="none" stroke="white" strokeWidth="0.5" /></svg>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none"><polyline points={itinerary.map(i => `${i.coords.x},${i.coords.y}`).join(' ')} fill="none" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="1 1" className="opacity-60"/></svg>
        {itinerary.map((item) => (
          <button key={item.day} onClick={() => setCurrentDay(item.day)} className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${currentDay === item.day ? "z-20 scale-110" : "z-10 scale-75 opacity-60 hover:opacity-100 hover:scale-90"}`} style={{ left: `${item.coords.x}%`, top: `${item.coords.y}%` }}>
             {currentDay === item.day && <div className="absolute -inset-4 bg-emerald-500/30 rounded-full animate-ping"></div>}
             <MapPin className={`${currentDay === item.day ? "text-emerald-400" : "text-stone-400"} drop-shadow-md`} fill={currentDay === item.day ? "#10b981" : "currentColor"} size={24} />
          </button>
        ))}
        {selectedDayData && (
          <div className="absolute top-4 right-4 max-w-xs bg-stone-900/90 backdrop-blur-md border border-stone-700 text-white p-4 rounded-lg shadow-2xl animate-in slide-in-from-top-4">
             <div className="flex justify-between items-start mb-2"><span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Day {selectedDayData.day}</span><span className="text-stone-400 text-xs">{selectedDayData.date}</span></div>
             <h2 className="text-lg font-bold mb-1">{selectedDayData.location}</h2>
             <div className="flex gap-2 mt-3"><button onClick={() => handleOpenGoogleMaps(selectedDayData.location)} className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs py-2 rounded transition-colors"><ExternalLink size={14} /> View on Google Maps</button></div>
          </div>
        )}
      </div>
      <TimelineScrubber itinerary={itinerary} currentDay={currentDay} onDayChange={setCurrentDay}/>
    </div>
  );
};

// Budget Component
const BudgetPlanner = () => {
  const [budget, setBudget] = useState(1000);
  const [items, setItems] = useState([]);
  const handleAddExpense = ({ desc, cost }) => { setItems([...items, { id: Date.now(), desc, cost, currency: 'GBP' }]); };
  const totalSpent = items.reduce((acc, curr) => acc + parseFloat(curr.cost), 0);
  const remaining = budget - totalSpent;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 min-h-[600px]">
      <div className="flex flex-wrap justify-between items-center mb-8 bg-stone-50 p-4 rounded-xl border border-stone-100">
        <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2"><Wallet className="text-emerald-600" /> Team Budget</h2>
        <div className="flex items-center gap-6">
           <div className="text-right"><div className="text-xs font-bold text-stone-400 uppercase">Budget</div><div className="flex items-center justify-end"><span className="text-stone-400 font-bold mr-1">£</span><input type="number" value={budget} onChange={(e) => setBudget(parseFloat(e.target.value))} className="w-20 bg-transparent font-bold text-xl text-stone-800 text-right outline-none border-b border-dashed border-stone-300" /></div></div>
           <div className="text-right"><div className="text-xs font-bold text-blue-500 uppercase">Spent</div><div className="font-bold text-xl text-blue-600">£{totalSpent.toFixed(2)}</div></div>
           <div className="text-right"><div className="text-xs font-bold text-emerald-500 uppercase">Remaining</div><div className="font-bold text-xl text-emerald-600">£{remaining.toFixed(2)}</div></div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 lg:w-5/12"><Calculator onAddExpense={handleAddExpense} /></div>
        <div className="md:w-1/2 lg:w-7/12">
          <h3 className="text-lg font-bold text-stone-700 mb-4 flex items-center gap-2"><List size={20}/> Expense Log</h3>
          <div className="space-y-3 h-[500px] overflow-y-auto pr-2">
            {items.length === 0 && <div className="flex flex-col items-center justify-center h-48 text-stone-400 border-2 border-dashed border-stone-200 rounded-xl"><Wallet size={48} className="mb-2 opacity-20" /><p>No expenses added yet.</p></div>}
            {[...items].reverse().map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div><div className="font-bold text-stone-800 text-lg">{item.desc}</div><div className="text-xs text-stone-400 font-mono">ID: {item.id.toString().slice(-4)}</div></div>
                <div className="flex items-center gap-4"><span className="font-bold text-xl text-stone-800">£{parseFloat(item.cost).toFixed(2)}</span><button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="text-stone-300 hover:text-red-500 p-2 rounded-full hover:bg-stone-50 transition-colors"><Trash2 size={18} /></button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Notes Component
const NotesBoard = () => {
  const [activeTab, setActiveTab] = useState('packing');
  const [notes, setNotes] = useState({ packing: ["Hiking boots", "Water purification tablets"], medical: ["Yellow Fever cert", "Altitude meds"], general: ["Check passport expiry"] });
  const [newNote, setNewNote] = useState("");
  const addNote = () => { if (!newNote) return; setNotes({ ...notes, [activeTab]: [...notes[activeTab], newNote] }); setNewNote(""); };
  const removeNote = (category, index) => { const newCatNotes = [...notes[category]]; newCatNotes.splice(index, 1); setNotes({ ...notes, [category]: newCatNotes }); };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 min-h-[600px]">
      <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Notebook className="text-emerald-600" /> Notebook</h2>
      <div className="flex gap-2 mb-6 border-b border-stone-100 pb-1">{['packing', 'medical', 'general'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-t-lg font-medium text-sm capitalize transition-colors ${activeTab === tab ? "bg-stone-100 text-stone-800 border-b-2 border-emerald-500" : "text-stone-400 hover:text-stone-600"}`}>{tab}</button>))}</div>
      <div className="mb-4 flex gap-2"><input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addNote()} placeholder={`Add item...`} className="flex-grow p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-100" /><button onClick={addNote} className="bg-emerald-600 text-white px-4 rounded-lg hover:bg-emerald-700"><Plus size={20} /></button></div>
      <div className="space-y-2">{notes[activeTab].map((note, idx) => (<div key={idx} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-100 group"><button onClick={() => removeNote(activeTab, idx)} className="text-stone-300 hover:text-emerald-500"><CheckSquare size={18} /></button><span className="text-stone-700">{note}</span><button onClick={() => removeNote(activeTab, idx)} className="ml-auto text-stone-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button></div>))}</div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function App() {
  const [view, setView] = useState("itinerary");
  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState("All");
  const [showDataModal, setShowDataModal] = useState(false);
  const [dataString, setDataString] = useState("");

  const handleEditClick = (item) => { setEditingId(item.day); setEditForm({ ...item, travelStats: item.travelStats || [] }); };
  const handleSave = () => { setItinerary(itinerary.map(item => item.day === editingId ? editForm : item)); setEditingId(null); };
  const handleChange = (e) => { setEditForm({ ...editForm, [e.target.name]: e.target.value }); };
  const handleExportData = () => { const data = JSON.stringify(itinerary, null, 2); setDataString(data); setShowDataModal(true); };
  const handleImportData = () => { try { const parsed = JSON.parse(dataString); setItinerary(parsed); setShowDataModal(false); alert("Itinerary updated successfully!"); } catch (e) { alert("Invalid data format."); } };
  const handlePrint = () => { window.print(); };

  // New Travel Stat Edit Handlers
  const handleAddTravelStat = () => {
    setEditForm({
      ...editForm,
      travelStats: [...(editForm.travelStats || []), { mode: 'Bus', time: '12:00', details: 'New Travel' }]
    });
  };
  const handleRemoveTravelStat = (idx) => {
    const newStats = [...editForm.travelStats];
    newStats.splice(idx, 1);
    setEditForm({ ...editForm, travelStats: newStats });
  };
  const handleEditTravelStat = (idx, field, value) => {
    const newStats = [...editForm.travelStats];
    newStats[idx] = { ...newStats[idx], [field]: value };
    setEditForm({ ...editForm, travelStats: newStats });
  };

  const filteredItinerary = filter === "All" ? itinerary : itinerary.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans flex flex-col md:flex-row relative print:block">
      
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-full { width: 100% !important; margin: 0 !important; padding: 0 !important; }
          body { background: white; }
          .page-break { page-break-inside: avoid; }
        }
      `}</style>

      {/* Sidebar - Hidden in Print */}
      <nav className="bg-stone-900 text-stone-400 w-full md:w-64 flex-shrink-0 flex md:flex-col justify-between p-4 sticky top-0 z-40 md:h-screen no-print">
        <div className="flex md:flex-col gap-8 md:gap-8 w-full">
          <div className="hidden md:block">
            <h1 className="text-white font-bold text-xl flex items-center gap-2 mb-1"><Mountain className="text-yellow-400" size={24} /> Peru '26</h1>
            <p className="text-xs text-stone-500">Expedition Manager</p>
          </div>
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible w-full no-scrollbar">
            {[{ id: 'itinerary', icon: LayoutDashboard, label: 'Itinerary' }, { id: 'map', icon: MapIcon, label: 'Expedition Map' }, { id: 'budget', icon: Wallet, label: 'Team Budget' }, { id: 'notes', icon: Notebook, label: 'Notebook' }].map(item => (
              <button key={item.id} onClick={() => setView(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${view === item.id ? "bg-emerald-900 text-white shadow-lg" : "hover:bg-stone-800 hover:text-stone-200"}`}><item.icon size={18} /><span className="font-medium">{item.label}</span></button>
            ))}
          </div>
        </div>
        <div className="hidden md:block"><button onClick={handleExportData} className="flex items-center gap-2 text-xs text-stone-500 hover:text-emerald-400 transition-colors w-full p-2"><Share2 size={14} /> Import/Export Data</button></div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 h-screen overflow-y-auto print:h-auto print:overflow-visible print-full">
        <div className="max-w-5xl mx-auto h-full pb-20 print:pb-0">
          
          {/* Header for Print Only */}
          <div className="hidden print:block mb-8 text-center border-b border-stone-200 pb-4">
             <h1 className="text-4xl font-bold text-stone-900 flex items-center justify-center gap-2"><Mountain className="text-stone-900" size={32} /> Peru Expedition 2026</h1>
             <p className="text-stone-500 mt-2">Generated Itinerary & Plan</p>
          </div>

          {/* View: Itinerary */}
          {view === 'itinerary' && (
            <div className="animate-in fade-in duration-500">
               <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-200 sticky top-0 z-30 no-print">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                  {["All", "Trek", "Project", "Travel", "Culture"].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${filter === cat ? "bg-emerald-800 text-white shadow-md" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>{cat}</button>
                  ))}
                </div>
                <button onClick={handlePrint} className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 text-sm shadow-md whitespace-nowrap"><Download size={16} /> Print / Save as PDF</button>
              </div>

              <div className="space-y-6">
                {filteredItinerary.map((item) => (
                  <div key={item.day} className={`relative page-break ${editingId === item.day ? "z-10" : ""}`}>
                    
                    {/* Left Timeline Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-0.5 bg-stone-200 -z-10"></div>
                    <div className="hidden md:block absolute left-[116px] top-8 w-2.5 h-2.5 rounded-full border-2 border-white bg-emerald-500 z-0 shadow-sm"></div>

                    <div className="flex flex-col md:flex-row gap-8">
                      
                      {/* Date Column (Left) */}
                      <div className="md:w-28 flex-shrink-0 flex md:flex-col items-center md:items-end md:text-right pt-7">
                         <span className="text-2xl font-bold text-stone-400">Day {item.day}</span>
                         <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mt-1">{item.date.split(' ').slice(0,3).join(' ')}</span>
                      </div>

                      {/* Card (Right) */}
                      <div className="flex-grow flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                        
                        {/* Image Section */}
                        <div className="md:w-40 h-32 md:h-auto relative bg-stone-200 flex-shrink-0">
                          <img 
                            src={item.img?.startsWith('http') ? item.img : `https://loremflickr.com/400/400/${item.img || 'peru'}?lock=${item.day}`} 
                            alt={item.location} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <div className="text-white text-[10px] font-bold uppercase tracking-wider">{item.category}</div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-grow p-4 md:p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                               <h3 className="font-bold text-lg text-stone-800 leading-tight">{item.location}</h3>
                               <button onClick={() => handleEditClick(item)} className="text-stone-300 hover:text-stone-600 no-print"><Edit2 size={16} /></button>
                            </div>

                            {editingId === item.day ? (
                              <div className="mt-2 bg-blue-50 p-4 rounded-lg space-y-3">
                                 <div>
                                    <label className="text-xs font-bold text-blue-800 uppercase">Activity</label>
                                    <textarea name="activity" value={editForm.activity} onChange={handleChange} className="w-full p-2 rounded border border-blue-200 text-sm h-16 mt-1" />
                                 </div>
                                 
                                 {/* Notes Edit Field */}
                                 <div>
                                    <label className="text-xs font-bold text-blue-800 uppercase">Personal Notes</label>
                                    <textarea name="notes" value={editForm.notes} onChange={handleChange} className="w-full p-2 rounded border border-blue-200 text-sm h-16 mt-1" />
                                 </div>

                                 {/* Image Keywords Input */}
                                 <div>
                                    <label className="text-xs font-bold text-blue-800 uppercase">Image</label>
                                    <input 
                                      type="text" 
                                      name="img" 
                                      value={editForm.img || ''} 
                                      onChange={handleChange} 
                                      placeholder="Keywords (e.g. mountain) or URL"
                                      className="w-full p-2 rounded border border-blue-200 text-sm mt-1" 
                                    />
                                    <p className="text-[10px] text-blue-600 mt-1">Enter keywords for auto-generation, or paste a direct image URL.</p>
                                 </div>
                                 
                                 {/* Edit Travel Tiles */}
                                 <div>
                                   <div className="flex justify-between items-center mb-1">
                                     <label className="text-xs font-bold text-blue-800 uppercase">Travel Stats</label>
                                     <button onClick={handleAddTravelStat} className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-0.5 rounded flex items-center gap-1"><Plus size={12}/> Add</button>
                                   </div>
                                   <div className="space-y-2">
                                     {editForm.travelStats && editForm.travelStats.map((stat, idx) => (
                                       <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded border border-blue-100">
                                         <select 
                                           value={stat.mode} 
                                           onChange={(e) => handleEditTravelStat(idx, 'mode', e.target.value)} 
                                           className="text-xs p-1 border rounded"
                                         >
                                            <option>Bus</option><option>Plane</option><option>Trek</option><option>Boat</option><option>Train</option>
                                         </select>
                                         <input 
                                           value={stat.time} 
                                           onChange={(e) => handleEditTravelStat(idx, 'time', e.target.value)}
                                           className="text-xs p-1 border rounded w-16"
                                           placeholder="Time"
                                         />
                                         <input 
                                           value={stat.details} 
                                           onChange={(e) => handleEditTravelStat(idx, 'details', e.target.value)}
                                           className="text-xs p-1 border rounded flex-grow"
                                           placeholder="Details"
                                         />
                                         <button onClick={() => handleRemoveTravelStat(idx)} className="text-red-400 hover:text-red-600"><X size={14}/></button>
                                       </div>
                                     ))}
                                   </div>
                                 </div>

                                 <div className="flex justify-end gap-2 pt-2">
                                    <button onClick={() => setEditingId(null)} className="text-stone-500 text-sm hover:underline">Cancel</button>
                                    <button onClick={handleSave} className="bg-blue-600 text-white px-3 py-1 rounded text-sm shadow-sm hover:bg-blue-700">Save Changes</button>
                                 </div>
                              </div>
                            ) : (
                              <>
                                {/* Display Travel Tiles */}
                                {item.travelStats && item.travelStats.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {item.travelStats.map((stat, idx) => (
                                      <TravelTile key={idx} {...stat} />
                                    ))}
                                  </div>
                                )}
                                <p className="text-stone-600 text-sm leading-relaxed mb-3">{item.activity}</p>
                                
                                {/* Restored & Styled Notes Field */}
                                {item.notes && (
                                  <div className="mt-3 flex items-start gap-2 text-xs text-stone-600 bg-stone-100 p-2 rounded border border-stone-200">
                                    <NotebookPen size={14} className="mt-0.5 flex-shrink-0" />
                                    <span>{item.notes}</span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-3 pt-3 border-t border-stone-100 mt-auto">
                            {item.accommodation && (
                              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                                <Moon size={14} className="text-indigo-400" /> {item.accommodation}
                              </div>
                            )}
                            {item.altitude && item.altitude !== "Sea Level" && (
                              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                                <Mountain size={14} className="text-emerald-500" /> {item.altitude}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'map' && <MapView itinerary={itinerary} />}
          {view === 'budget' && <BudgetPlanner />}
          {view === 'notes' && <NotesBoard />}
        </div>
      </main>

      {/* Import/Export Modal */}
      {showDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold mb-4">Collaboration Data</h3>
            <textarea value={dataString} onChange={(e) => setDataString(e.target.value)} className="w-full h-48 p-3 border border-stone-200 rounded-lg font-mono text-xs mb-4" />
            <div className="flex gap-4 justify-end">
              <button onClick={() => setShowDataModal(false)} className="text-stone-500">Cancel</button>
              <button onClick={handleImportData} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Import</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}