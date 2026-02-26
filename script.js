/* ─── THEME ─── */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const label = isDark ? '☀️' : '🌙';
    document.querySelectorAll('.theme-label, #dashThemeLabel').forEach(el => el && (el.textContent = label));
  }
  
  /* ─── PAGE ROUTING ─── */
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
  }
  
  function goTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  
  /* ─── ADMIN LOGIN ─── */
  function adminLogin() {
    const u = document.getElementById('adminUser').value;
    const p = document.getElementById('adminPass').value;
    const err = document.getElementById('loginError');
    if (u === 'admin' && p === 'admin123') {
      err.classList.remove('show');
      showPage('dashPage');
    } else {
      err.classList.add('show');
    }
  }
  
  /* ─── DASHBOARD TABS ─── */
  function switchTab(btn, tabId) {
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
  }
  
  /* ─── MODALS ─── */
  function openModal(id) { document.getElementById(id).classList.add('open'); }
  function closeModal(id) { document.getElementById(id).classList.remove('open'); }
  document.querySelectorAll('.modal-bg').forEach(m => m.addEventListener('click', e => { if(e.target===m) m.classList.remove('open'); }));
  
  /* ─── TOAST ─── */
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = '✓ ' + msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
  
  /* ─── DELETE ROW ─── */
  function delRow(btn) {
    if (confirm('Delete this record?')) {
      btn.closest('tr').remove();
      toast('Record deleted.');
    }
  }
  
  /* ─── CRUD ─── */
  function addOffer() {
    const n=document.getElementById('oName').value, c=document.getElementById('oCode').value,
          d=document.getElementById('oDisc').value, dt=document.getElementById('oDate').value;
    if (!n||!c) return alert('Fill required fields.');
    document.getElementById('offersBody').insertAdjacentHTML('beforeend',
      `<tr><td>${n}</td><td>${c}</td><td>${d}</td><td>${dt}</td><td><span class="badge badge-green">Active</span></td><td class="action-cell"><button class="btn-xs btn-edit">Edit</button><button class="btn-xs btn-del" onclick="delRow(this)">Delete</button></td></tr>`);
    closeModal('offerModal');
    toast('Offer added!');
    ['oName','oCode','oDisc','oDate'].forEach(id=>document.getElementById(id).value='');
  }
  function addAddon() {
    const n=document.getElementById('aName').value, d=document.getElementById('aDesc').value, p=document.getElementById('aPrice').value;
    if (!n) return alert('Enter add-on name.');
    document.getElementById('addonsBody').insertAdjacentHTML('beforeend',
      `<tr><td>${n}</td><td>${d}</td><td>${p}</td><td><span class="badge badge-green">Active</span></td><td class="action-cell"><button class="btn-xs btn-edit">Edit</button><button class="btn-xs btn-del" onclick="delRow(this)">Delete</button></td></tr>`);
    closeModal('addonModal');
    toast('Add-on created!');
    ['aName','aDesc','aPrice'].forEach(id=>document.getElementById(id).value='');
  }
  function addExpert() {
    const n=document.getElementById('eName').value, c=document.getElementById('eCity').value, s=document.getElementById('eSpec').value;
    if (!n) return alert('Enter expert name.');
    document.getElementById('expertsBody').insertAdjacentHTML('beforeend',
      `<tr><td>${n}</td><td>${s}</td><td>${c}</td><td>0</td><td>New★</td><td><span class="badge badge-green">Active</span></td><td class="action-cell"><button class="btn-xs btn-edit">Edit</button><button class="btn-xs btn-del" onclick="delRow(this)">Delete</button></td></tr>`);
    closeModal('expertModal');
    toast('Expert added!');
    ['eName','eCity','eSpec'].forEach(id=>document.getElementById(id).value='');
  }
  
  /* ─── BOOKING FORM ─── */
  function handleBooking() {
    const name = document.getElementById('bName').value;
    const car = document.getElementById('bCar').value;
    if (!name || !car) { alert('Please enter your name and car model.'); return; }
    /*
      PAYMENT GATEWAY INTEGRATION POINT
      ─────────────────────────────────
      Replace this alert with your gateway call:
  
      Razorpay:
        var rzp = new Razorpay({ key:'KEY', amount: AMOUNT*100, name:'DriveHome',
          description: SERVICE, handler: function(res){ confirmBooking(res.razorpay_payment_id); } });
        rzp.open();
  
      Stripe:
        stripe.redirectToCheckout({ sessionId: await createCheckoutSession() });
    */
    toast(`Booking confirmed for ${name}! We'll call you within 1 hour.`);
  }
  
  function selectPay(el) {
    el.closest('.pay-methods').querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected'));
    el.classList.add('selected');
  }