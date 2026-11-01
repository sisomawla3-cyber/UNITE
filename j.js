let currentActiveGame = null;
let activeAnnouncement = localStorage.getItem('unite_announcement') || "";

let systemSettings = JSON.parse(localStorage.getItem('unite_settings')) || {
  username: "uniteisgoated",
  password: "310",
  lockoutCode: "sarry310",
  adminCode: "310"
};

const AUTH_STORAGE_KEY = 'unite_logged_in';
const LOCKOUT_STORAGE_KEY = 'unite_lockout_active';

const UGS_BASE = 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/';

// Default Complete Game Library Array
const defaultGameList = [
  { id: 'adofai', title: 'A Dance of Fire and Ice', cover: 'https://images.crazygames.com/a-dance-of-fire-and-ice/20201116160822/a-dance-of-fire-and-ice-cover', type: 'iframe', embedUrl: UGS_BASE + 'clADOFAI.html' },
  { id: 'adarkroom', title: 'A Dark Room', cover: 'https://images.crazygames.com/a-dark-room/20210315152033/a-dark-room-cover', type: 'iframe', embedUrl: UGS_BASE + 'clADarkRoom.html' },
  { id: 'adatewithdeath', title: 'A Date With Death', cover: 'https://images.crazygames.com/a-date-with-death/20231201101234/a-date-with-death-cover', type: 'iframe', embedUrl: UGS_BASE + 'cladatewithdeath.html' },
  { id: 'adayintheoffice', title: 'A Day In The Office', cover: 'https://images.crazygames.com/a-day-in-the-office/20220815102030/a-day-in-the-office-cover', type: 'iframe', embedUrl: UGS_BASE + 'cladayintheoffice.html' },
  { id: 'agameaboutballswithweapons', title: 'A Game About Balls With Weapons', cover: 'https://images.crazygames.com/balls-with-weapons/20220512101010/balls-with-weapons-cover', type: 'iframe', embedUrl: UGS_BASE + 'clagameaboutballswithweapons.html' },
  { id: 'adventneon', title: 'Advent Neon', cover: 'https://images.crazygames.com/advent-neon/20210810141200/advent-neon-cover', type: 'iframe', embedUrl: UGS_BASE + 'cladventneon.html' },
  { id: 'adventurecapitalist', title: 'Adventure Capitalist', cover: 'https://images.crazygames.com/adventure-capitalist/20200810121212/adventure-capitalist-cover', type: 'iframe', embedUrl: UGS_BASE + 'clAdventureCapatalist.html' },
  { id: 'ahoysurvival', title: 'Ahoy Survival', cover: 'https://images.crazygames.com/ahoy-survival/20220110111111/ahoy-survival-cover', type: 'iframe', embedUrl: UGS_BASE + 'clahoysurvival.html' },
  { id: 'airlinetycoonidle', title: 'Airline Tycoon Idle', cover: 'https://images.crazygames.com/airline-tycoon-idle/20211111111111/airline-tycoon-idle-cover', type: 'iframe', embedUrl: UGS_BASE + 'clairlinetycoonidle.html' },
  { id: 'agariolite', title: 'Agar.io Lite', cover: 'https://images.crazygames.com/agar-io/20210212101010/agar-io-cover', type: 'iframe', embedUrl: UGS_BASE + 'clagariolite.html' },
  { id: 'agesofconflict', title: 'Ages of Conflict', cover: 'https://images.crazygames.com/ages-of-conflict/20220910101010/ages-of-conflict-cover', type: 'iframe', embedUrl: UGS_BASE + 'clagesofconflict.html' },
  { id: 'alienskyinvasion', title: 'Alien Sky Invasion', cover: 'https://images.crazygames.com/alien-sky-invasion/20201010101010/alien-sky-invasion-cover', type: 'iframe', embedUrl: UGS_BASE + 'clalienskyinvasion.html' },
  { id: 'allocation', title: 'Allocation', cover: 'https://images.crazygames.com/allocation/20220505101010/allocation-cover', type: 'iframe', embedUrl: UGS_BASE + 'clallocation.html' },
  { id: 'amazingstrangeropepolice', title: 'Amazing Strange Rope Police', cover: 'https://images.crazygames.com/amazing-strange-rope-police-vice-spider-vegas/20201210101010/cover', type: 'iframe', embedUrl: UGS_BASE + 'clstreangeropepolice.html' },
  { id: 'amidstthesky', title: 'Amidst The Sky', cover: 'https://images.crazygames.com/amidst-the-sky/20211210101010/amidst-the-sky-cover', type: 'iframe', embedUrl: UGS_BASE + 'clamidstthesky.html' },
  { id: 'amongus', title: 'Among Us', cover: 'https://images.crazygames.com/among-us/20201110101010/among-us-cover', type: 'iframe', embedUrl: UGS_BASE + 'clamongus.html' },
  { id: 'amorphous', title: 'Amorphous +', cover: 'https://images.crazygames.com/amorphous-plus/20200810101010/amorphous-plus-cover', type: 'iframe', embedUrl: UGS_BASE + 'clamorphous.html' },
  { id: 'ancientsins', title: 'Ancient Sins', cover: 'https://images.crazygames.com/ancient-sins/20210510101010/ancient-sins-cover', type: 'iframe', embedUrl: UGS_BASE + 'clancientsins.html' },
  { id: 'angrybirds', title: 'Angry Birds', cover: 'https://images.crazygames.com/angry-birds/20200510101010/angry-birds-cover', type: 'iframe', embedUrl: UGS_BASE + 'clangrybirds.html' },
  { id: 'angrybirds2', title: 'Angry Birds 2', cover: 'https://images.crazygames.com/angry-birds-2/20210510101010/angry-birds-2-cover', type: 'iframe', embedUrl: UGS_BASE + 'clangrybirds2.html' },
  { id: 'angrybirdsepic', title: 'Angry Birds Epic', cover: 'https://images.crazygames.com/angry-birds-epic/20200910101010/angry-birds-epic-cover', type: 'iframe', embedUrl: UGS_BASE + 'clangrybirdsepic.html' },
  { id: 'angrybirdsonline', title: 'Angry Birds Online', cover: 'https://images.crazygames.com/angry-birds-online/20200710101010/angry-birds-online-cover', type: 'iframe', embedUrl: UGS_BASE + 'clangrybirdsonline.html' },
  { id: 'angrybirdsshowdown', title: 'Angry Birds Showdown', cover: 'https://images.crazygames.com/angry-birds-showdown/20210210101010/angry-birds-showdown-cover', type: 'iframe', embedUrl: UGS_BASE + 'clangrybirdsshowdown.html' },
  { id: 'angrybirdsslingshotfrenzy', title: 'Angry Birds Slingshot Frenzy', cover: 'https://images.crazygames.com/angry-birds-slingshot/20210810101010/angry-birds-slingshot-cover', type: 'iframe', embedUrl: UGS_BASE + 'clangrybirdsslingshotfrenzy.html' },
  { id: 'animalcrossing', title: 'Animal Crossing (GameCube)', cover: 'https://images.crazygames.com/animal-crossing/20200610101010/animal-crossing-cover', type: 'iframe', embedUrl: UGS_BASE + 'clanimalcrossing.html' },
  { id: 'antimatterdimensions', title: 'Antimatter Dimensions', cover: 'https://images.crazygames.com/antimatter-dimensions/20201110101010/antimatter-dimensions-cover', type: 'iframe', embedUrl: UGS_BASE + 'clantimatterdimensions.html' },
  { id: 'antarttycoon', title: 'Ant Art Tycoon', cover: 'https://images.crazygames.com/ant-art-tycoon/20210410101010/ant-art-tycoon-cover', type: 'iframe', embedUrl: UGS_BASE + 'clantarttycoon.html' },
  { id: 'apesvshelium', title: 'Apes vs. Helium', cover: 'https://images.crazygames.com/apes-vs-helium/20220210101010/apes-vs-helium-cover', type: 'iframe', embedUrl: UGS_BASE + 'clapesvshelium.html' },
  { id: 'aquaparkio', title: 'Aquapark.io', cover: 'https://images.crazygames.com/aquapark-io/20200310101010/aquapark-io-cover', type: 'iframe', embedUrl: UGS_BASE + 'claquaparkio.html' },
  { id: 'arcadevolley', title: 'Arcade Volley', cover: 'https://images.crazygames.com/arcade-volley/20210110101010/arcade-volley-cover', type: 'iframe', embedUrl: UGS_BASE + 'clarcadevolley.html' },
  { id: 'archeryworldtour', title: 'Archery World Tour', cover: 'https://images.crazygames.com/archery-world-tour/20200410101010/archery-world-tour-cover', type: 'iframe', embedUrl: UGS_BASE + 'clarcheryworldtour.html' },
  { id: 'archesspelago', title: 'Archesspelago', cover: 'https://images.crazygames.com/archesspelago/20210910101010/archesspelago-cover', type: 'iframe', embedUrl: UGS_BASE + 'clarchesspelago.html' },
  { id: 'arsonate', title: 'Arsonate', cover: 'https://images.crazygames.com/arsonate/20220310101010/arsonate-cover', type: 'iframe', embedUrl: UGS_BASE + 'clarsonate.html' },
  { id: 'arewethereyet', title: 'Are We There Yet', cover: 'https://images.crazygames.com/are-we-there-yet/20211010101010/are-we-there-yet-cover', type: 'iframe', embedUrl: UGS_BASE + 'clarewethereyet.html' },
  { id: 'arthursnightmare', title: 'Arthur's Nightmare', cover: 'https://images.crazygames.com/arthurs-nightmare/20201210101010/arthurs-nightmare-cover', type: 'iframe', embedUrl: UGS_BASE + 'clarthuarsnightmare.html' },
  { id: 'ascent', title: 'Ascent', cover: 'https://images.crazygames.com/ascent/20210710101010/ascent-cover', type: 'iframe', embedUrl: UGS_BASE + 'clascent.html' },
  { id: 'assessmentexamination', title: 'Assessment Examination', cover: 'https://images.crazygames.com/assessment-examination/20220610101010/assessment-examination-cover', type: 'iframe', embedUrl: UGS_BASE + 'classesmentexaminationque.html' },
  { id: 'asdutydemands', title: 'As Duty Demands', cover: 'https://images.crazygames.com/as-duty-demands/20210810101010/as-duty-demands-cover', type: 'iframe', embedUrl: UGS_BASE + 'clasdutydemands.html' },
  { id: 'asteroids', title: 'Asteroids', cover: 'https://images.crazygames.com/asteroids/20200210101010/asteroids-cover', type: 'iframe', embedUrl: UGS_BASE + 'clasteroidsALT.html' },
  { id: 'asmallworldcup', title: 'A Small World Cup', cover: 'https://images.crazygames.com/a-small-world-cup/20221110101010/a-small-world-cup-cover', type: 'iframe', embedUrl: UGS_BASE + 'clasmallworldcup.html' },
  { id: 'aviamasters', title: 'Aviamasters', cover: 'https://images.crazygames.com/aviamasters/20230110101010/aviamasters-cover', type: 'iframe', embedUrl: UGS_BASE + 'claviamastersbuggy.html' },
  { id: 'sandbox_city', title: 'Sandbox City', cover: 'https://images.crazygames.com/sandbox-city---cars-zombies-ragdolls_16x9/20231123041042/sandbox-city---cars-zombies-ragdolls_16x9-cover.avif', type: 'iframe', embedUrl: 'https://cdn.jsdelivr.net/gh/faralong/all@main/sandboxcity/index.html' },
  { id: 'red_ball_4', title: 'Red Ball 4', cover: 'https://cdn.jsdelivr.net/gh/greeniYT/y@main/rdbal/images/background.jpg', type: 'iframe', embedUrl: 'https://cdn.jsdelivr.net/gh/greeniYT/y@main/rdbal/index.html' },
  { id: 'subway_surfers', title: 'Subway Surfers: Beijing', cover: 'https://cdn.jsdelivr.net/gh/bubbls/subwaysurfersmerge/img/FirstAvatar.png', type: 'iframe', embedUrl: 'https://cdn.jsdelivr.net/gh/bubbls/subwaysurfersmerge/index.html' },
  { id: 'slope', title: 'Slope', cover: 'https://images.crazygames.com/slope/20231018023157/slope-cover', type: 'iframe', embedUrl: 'https://k3llan.github.io/slope/' },
  { id: '1v1_lol', title: '1v1.LOL', cover: 'https://images.crazygames.com/1v1-lol/20220616140735/1v1-lol-cover', type: 'iframe', embedUrl: 'https://1v1.lol/' },
  { id: 'bitlife', title: 'BitLife', cover: 'https://sz-games.github.io/cover/Bitlife.webp', type: 'iframe', embedUrl: 'https://sz-games.github.io/Bitlife.html' },
  { id: 'geometry_dash', title: 'Geometry Dash', cover: 'https://images.crazygames.com/geometry-dash-lite/20230221162402/geometry-dash-lite-cover', type: 'iframe', embedUrl: 'https://geometrydash.io/game/geometry-dash-online/' },
  { id: 'retro_bowl', title: 'Retro Bowl', cover: 'https://images.crazygames.com/retro-bowl/20231121171802/retro-bowl-cover', type: 'iframe', embedUrl: 'https://game316000.konggames.com/gamez/0031/6000/live/index.html' }
];

let gameLibrary = JSON.parse(localStorage.getItem('unite_games')) || defaultGameList;
let recommendations = JSON.parse(localStorage.getItem('unite_recs')) || [];

function updateLoginBtnState() {
  const u = document.getElementById('sparxUsername').value.trim();
  const p = document.getElementById('sparxPassword').value.trim();
  const btn = document.getElementById('sparxSubmitBtn');
  if (!btn) return;

  if (u.length > 0 && p.length > 0) {
    btn.className = "sparx-login-btn-active w-full py-3.5 px-4 font-bold text-base transition-all duration-200 cursor-pointer mt-2";
  } else {
    btn.className = "sparx-login-btn-inactive w-full py-3.5 px-4 font-bold text-base transition-all duration-200 cursor-not-allowed mt-2";
  }
}

function togglePasswordVisibility() {
  const input = document.getElementById('sparxPassword');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function handleSparxLogin(e) {
  if (e) e.preventDefault();
  const u = document.getElementById('sparxUsername').value.trim();
  const p = document.getElementById('sparxPassword').value.trim();
  const errDiv = document.getElementById('loginError');

  if (u === systemSettings.username && p === systemSettings.password) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('unite-dashboard').classList.remove('hidden');
    if (errDiv) errDiv.classList.add('hidden');
    renderGameGrid(gameLibrary);
    checkAndRenderAnnouncement();
  } else {
    if (errDiv) {
      errDiv.innerText = "Incorrect username or password. Please try again.";
      errDiv.classList.remove('hidden');
    }
  }
}

function handleMicrosoftLogin() {
  handleSparxLogin();
}

function triggerSchoolSwitch() {
  alert("School selection locked by system administrator.");
}

function showNewStudentInfo(e) {
  if (e) e.preventDefault();
  alert("Please contact your math teacher or school system administrator to obtain your login credentials.");
}

function showForgotLoginInfo(e) {
  if (e) e.preventDefault();
  alert("If you have forgotten your password, ask your teacher to reset it in their Sparx Teacher Portal.");
}

function checkInitialAppState() {
  const isLoggedIn = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  const isLockout = localStorage.getItem(LOCKOUT_STORAGE_KEY) === 'true';

  if (isLockout) {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('unite-dashboard').classList.add('hidden');
    document.getElementById('lockoutScreen').classList.remove('hidden');
  } else if (isLoggedIn) {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('lockoutScreen').classList.add('hidden');
    document.getElementById('unite-dashboard').classList.remove('hidden');
    renderGameGrid(gameLibrary);
    checkAndRenderAnnouncement();
  } else {
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('lockoutScreen').classList.add('hidden');
    document.getElementById('unite-dashboard').classList.add('hidden');
  }

  const setU = document.getElementById('settings-username');
  const setP = document.getElementById('settings-password');
  const setL = document.getElementById('settings-lockout-code');
  const setA = document.getElementById('settings-admin-code');

  if (setU) setU.value = systemSettings.username;
  if (setP) setP.value = systemSettings.password;
  if (setL) setL.value = systemSettings.lockoutCode;
  if (setA) setA.value = systemSettings.adminCode;
}

function handleAdminOverride() {
  const code = document.getElementById('adminOverrideInput').value.trim();
  if (code === systemSettings.lockoutCode || code === "sarry310" || code === "310") {
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
    document.getElementById('lockoutScreen').classList.add('hidden');
    checkInitialAppState();
  } else {
    alert("INVALID OVERRIDE CODE");
  }
}

function syncCloudData(key, data) {
  if (key === 'games') {
    gameLibrary = data;
    localStorage.setItem('unite_games', JSON.stringify(data));
  } else if (key === 'recs') {
    recommendations = data;
    localStorage.setItem('unite_recs', JSON.stringify(data));
  } else if (key === 'announcement') {
    activeAnnouncement = data;
    localStorage.setItem('unite_announcement', data);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  checkInitialAppState();
});

function renderGameGrid(games) {
  const grid = document.getElementById('games-grid');
  const noGames = document.getElementById('no-games-found');
  if (!grid) return;

  grid.innerHTML = '';
  if (!games || games.length === 0) {
    if (noGames) noGames.classList.remove('hidden');
    return;
  }

  if (noGames) noGames.classList.add('hidden');

  const sortedGames = [...games].sort((a, b) => a.title.localeCompare(b.title));

  sortedGames.forEach(game => {
    const fallbackCover = `https://placehold.co/600x400/111111/FFFFFF?text=${encodeURIComponent(game.title)}`;
    const card = document.createElement('div');
    card.className = "bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-white transition-all cursor-pointer flex flex-col h-full";
    card.onclick = () => openGameModal(game.id);

    card.innerHTML = `
      <div class="w-full bg-zinc-900 relative flex items-center justify-center overflow-hidden p-2 min-h-[220px]">
        <img src="${game.cover}" alt="${game.title}" class="w-full h-auto max-h-[350px] object-contain group-hover:scale-105 transition-transform duration-300 rounded" onerror="this.onerror=null; this.src='${fallbackCover}';">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="bg-white text-black font-anton px-4 py-2 text-sm uppercase tracking-wider rounded shadow-lg">PLAY GAME</span>
        </div>
      </div>
      <div class="p-4 flex items-center justify-between bg-zinc-950 mt-auto border-t border-zinc-900">
        <h3 class="font-anton text-lg tracking-wider text-white truncate">${game.title}</h3>
        <i data-lucide="play" class="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors shrink-0"></i>
      </div>
    `;
    grid.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

function openGameModal(gameId) {
  const game = gameLibrary.find(g => g.id === gameId);
  if (!game) return;

  currentActiveGame = game;
  document.getElementById('modal-game-title').innerText = game.title;

  const container = document.getElementById('game-container');
  container.innerHTML = '';

  const iframe = document.createElement('iframe');
  iframe.className = "w-full h-full border-0";
  iframe.setAttribute('allow', 'fullscreen; autoplay');

  if (game.type === 'iframe') {
    iframe.src = game.embedUrl;
  } else {
    iframe.srcdoc = game.customHtml;
  }

  container.appendChild(iframe);
  document.getElementById('game-modal').classList.remove('hidden');
}

function closeGameModal() {
  document.getElementById('game-modal').classList.add('hidden');
  document.getElementById('game-container').innerHTML = '';
  currentActiveGame = null;
}

function reloadGameFrame() {
  if (currentActiveGame) {
    openGameModal(currentActiveGame.id);
  }
}

function toggleFullscreen(elementId) {
  const el = document.getElementById(elementId);
  if (!document.fullscreenElement) {
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(err => console.warn(err));
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.warn(err));
    }
  }
}

function filterGames() {
  const q = document.getElementById('game-search-input').value.toLowerCase().trim();
  const filtered = gameLibrary.filter(g => g.title.toLowerCase().includes(q));
  renderGameGrid(filtered);
}

function checkAndRenderAnnouncement() {
  const banner = document.getElementById('global-announcement-banner');
  const text = document.getElementById('announcement-banner-text');
  if (activeAnnouncement && activeAnnouncement.trim() !== "") {
    text.innerText = activeAnnouncement;
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }
}

function dismissBanner() {
  document.getElementById('global-announcement-banner').classList.add('hidden');
}

function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
  if (modalId === 'recommend-modal') renderCommunityRecommendations();
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

function submitRecommendation(e) {
  e.preventDefault();
  const title = document.getElementById('rec-title').value.trim();
  const url = document.getElementById('rec-url').value.trim();
  const notes = document.getElementById('rec-notes').value.trim();

  if (!title) return;

  const newRec = {
    id: 'rec_' + Date.now(),
    title,
    url,
    notes,
    status: 'PENDING',
    date: new Date().toLocaleDateString()
  };

  recommendations.push(newRec);
  syncCloudData('recs', recommendations);
  renderCommunityRecommendations();

  document.getElementById('rec-title').value = '';
  document.getElementById('rec-url').value = '';
  document.getElementById('rec-notes').value = '';

  alert("RECOMMENDATION SUBMITTED!");
}

function renderCommunityRecommendations() {
  const container = document.getElementById('community-recs-list');
  if (!container) return;
  container.innerHTML = '';

  if (recommendations.length === 0) {
    container.innerHTML = '<p class="text-zinc-500">NO REQUESTS SUBMITTED YET.</p>';
    return;
  }

  recommendations.forEach(r => {
    const item = document.createElement('div');
    item.className = "bg-zinc-900 border border-zinc-800 p-2 rounded flex justify-between items-center";
    item.innerHTML = `
      <div>
        <p class="font-bold text-white uppercase">${r.title}</p>
        <p class="text-[10px] text-zinc-500">${r.notes || 'No notes'}</p>
      </div>
      <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">${r.status}</span>
    `;
    container.appendChild(item);
  });
}

function promptAdminLogin() {
  openModal('admin-prompt-modal');
}

function submitAdminAuthPrompt() {
  const pwd = document.getElementById('admin-prompt-input').value.trim();
  if (pwd === systemSettings.adminCode || pwd === "310" || pwd === "sarry310") {
    closeModal('admin-prompt-modal');
    document.getElementById('admin-prompt-input').value = '';
    openModal('admin-modal');
    renderAdminLists();
  } else {
    alert("ACCESS DENIED: INCORRECT ADMIN PASSCODE");
  }
}

function switchAdminTab(tabName) {
  const tabs = ['games', 'announcements', 'recs', 'settings'];
  tabs.forEach(t => {
    document.getElementById(`admin-tab-${t}`).classList.add('hidden');
    document.getElementById(`admin-tab-btn-${t}`).className = "px-4 py-2 text-zinc-400 hover:text-white transition-colors shrink-0";
  });

  document.getElementById(`admin-tab-${tabName}`).classList.remove('hidden');
  document.getElementById(`admin-tab-btn-${tabName}`).className = "px-4 py-2 text-white border-b-2 border-white transition-colors shrink-0";
}

function toggleAdminEmbedInputs() {
  const type = document.getElementById('admin-game-type').value;
  document.getElementById('admin-input-custom').classList.toggle('hidden', type !== 'custom');
  document.getElementById('admin-input-iframe').classList.toggle('hidden', type !== 'iframe');
}

function handleAdminAddGame(e) {
  e.preventDefault();
  const title = document.getElementById('admin-game-title').value.trim();
  const urlCover = document.getElementById('admin-game-cover-url').value.trim();
  const cover = urlCover || 'https://placehold.co/600x400/111111/FFFFFF?text=' + encodeURIComponent(title);
  
  const sourceType = document.getElementById('admin-game-type').value;
  let gameType = 'iframe';
  let embedUrl = '';
  let customHtml = '';

  if (sourceType === 'iframe') {
    embedUrl = document.getElementById('admin-game-url').value.trim();
  } else if (sourceType === 'custom') {
    gameType = 'custom';
    customHtml = document.getElementById('admin-game-html').value;
  }

  const newGame = {
    id: 'game_' + Date.now(),
    title,
    cover,
    type: gameType,
    embedUrl,
    customHtml
  };

  gameLibrary.push(newGame);
  syncCloudData('games', gameLibrary);
  renderGameGrid(gameLibrary);
  renderAdminLists();

  document.getElementById('admin-game-title').value = '';
  document.getElementById('admin-game-cover-url').value = '';
  document.getElementById('admin-game-url').value = '';
  document.getElementById('admin-game-html').value = '';

  alert("GAME PUBLISHED TO ARCHIVE!");
}

function deleteGame(gameId) {
  if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS GAME?")) return;
  gameLibrary = gameLibrary.filter(g => g.id !== gameId);
  syncCloudData('games', gameLibrary);
  renderGameGrid(gameLibrary);
  renderAdminLists();
}

function renderAdminLists() {
  const gamesList = document.getElementById('admin-games-list');
  if (gamesList) {
    gamesList.innerHTML = '';
    gameLibrary.forEach(g => {
      const row = document.createElement('div');
      row.className = "bg-zinc-900 border border-zinc-800 p-3 rounded flex justify-between items-center";
      row.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${g.cover}" class="w-10 h-10 object-cover rounded" onerror="this.src='https://placehold.co/100/111111/FFFFFF?text=IMG'">
          <span class="font-bold text-white uppercase">${g.title}</span>
        </div>
        <button onclick="deleteGame('${g.id}')" class="px-3 py-1 bg-red-950 border border-red-800 text-red-400 hover:bg-red-800 hover:text-white rounded transition-colors uppercase">
          DELETE
        </button>
      `;
      gamesList.appendChild(row);
    });
  }

  const recsList = document.getElementById('admin-recs-list');
  if (recsList) {
    recsList.innerHTML = '';
    recommendations.forEach(r => {
      const card = document.createElement('div');
      card.className = "bg-zinc-900 border border-zinc-800 p-4 rounded font-anton text-xs space-y-2";
      card.innerHTML = `
        <div class="flex justify-between items-center">
          <h4 class="text-base text-white uppercase">${r.title}</h4>
          <span class="text-zinc-500">${r.date}</span>
        </div>
        <p class="text-zinc-400">${r.notes || 'No notes provided'}</p>
        ${r.url ? `<a href="${r.url}" target="_blank" class="text-blue-400 underline block truncate">${r.url}</a>` : ''}
      `;
      recsList.appendChild(card);
    });
  }
}

function handlePostAnnouncement(e) {
  e.preventDefault();
  const text = document.getElementById('admin-announcement-text').value.trim();
  activeAnnouncement = text;
  syncCloudData('announcement', text);
  checkAndRenderAnnouncement();
  alert("ANNOUNCEMENT BANNER PUBLISHED!");
}

function clearBanner() {
  activeAnnouncement = "";
  syncCloudData('announcement', "");
  checkAndRenderAnnouncement();
  document.getElementById('admin-announcement-text').value = '';
}

function handleBroadcastMessage(e) {
  e.preventDefault();
  const sender = document.getElementById('admin-message-sender').value.trim() || 'ADMIN';
  const msg = document.getElementById('admin-message-text').value.trim();
  const duration = parseInt(document.getElementById('admin-message-duration').value) || 5;

  triggerToastMessage(msg, sender, duration);
  document.getElementById('admin-message-text').value = '';
  alert("BROADCAST MESSAGE SENT!");
}

function triggerToastMessage(msg, sender, durationSec) {
  const container = document.getElementById('live-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = "pointer-events-auto bg-zinc-900 border border-zinc-700 text-white px-5 py-3 rounded-lg shadow-2xl flex flex-col gap-1 max-w-md w-full font-anton tracking-wider uppercase animate-bounce";
  toast.innerHTML = `
    <div class="flex justify-between items-center border-b border-zinc-800 pb-1">
      <span class="text-red-500 text-xs">${sender} SAYS:</span>
      <button onclick="this.parentElement.parentElement.remove()" class="text-zinc-500 hover:text-white">&times;</button>
    </div>
    <p class="text-sm text-zinc-200 mt-1">${msg}</p>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast && toast.parentNode) toast.remove();
  }, durationSec * 1000);
}

function handleSaveSettings(e) {
  e.preventDefault();
  systemSettings.username = document.getElementById('settings-username').value.trim();
  systemSettings.password = document.getElementById('settings-password').value.trim();
  systemSettings.lockoutCode = document.getElementById('settings-lockout-code').value.trim();
  systemSettings.adminCode = document.getElementById('settings-admin-code').value.trim();

  localStorage.setItem('unite_settings', JSON.stringify(systemSettings));
  alert("SYSTEM CONFIGURATION SAVED SUCCESSFULLY!");
}
