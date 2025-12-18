// Simple reveal on scroll + video modal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show')
      observer.unobserve(entry.target)
    }
  })
},{threshold:.15})
reveals.forEach(r=>observer.observe(r))

// Video modal
const modal = document.getElementById('videoModal')
const modalVideo = modal.querySelector('.modal-video')
const modalClose = modal.querySelector('.modal-close')

function openModalWith(src){
  modalVideo.src = src
  modal.setAttribute('aria-hidden','false')
  modalVideo.play().catch(()=>{})
}
function closeModal(){
  modalVideo.pause()
  modalVideo.src = ''
  modal.setAttribute('aria-hidden','true')
}

// card clicks
document.addEventListener('click', e=>{
  const card = e.target.closest('.card, .preview-frame')
  if(card && card.dataset && card.dataset.videoSrc){
    openModalWith(card.dataset.videoSrc)
  }
  if(e.target.closest('.modal-close')) closeModal()
})

// close on escape
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal() })

// simple menu toggle for small screens
const menuToggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.nav')
if(menuToggle){
  menuToggle.addEventListener('click', ()=>{ nav.classList.toggle('open') })
}

// small improvement: trap focus in modal (basic)
modal.addEventListener('click', e=>{ if(e.target===modal) closeModal() })
