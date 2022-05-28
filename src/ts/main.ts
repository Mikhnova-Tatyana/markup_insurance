const iconMenu: HTMLButtonElement | null = document.querySelector(".icon-menu");
const menuBody: HTMLElement | null = document.querySelector(".menu__body");

if (iconMenu) {
  iconMenu.addEventListener("click", function(event: MouseEvent): void {
    document.body.classList.toggle('_lock')
    iconMenu.classList.toggle('menu-open');
    menuBody!.classList.toggle('_active');
  });
}


let title: HTMLHeadingElement | null = document.querySelector(".instruction__title");
if (title) {
  window.addEventListener('resize', titleChange);
}

function titleChange(event: UIEvent): void {
  if((event.target as Window).innerWidth <= 768 && title) {
    title!.innerText = "Часто задаваемые вопросы";
  } else {
    title!.innerText = "Что делать при наступлении страхового случая?";
  }
}


let propositions: HTMLElement | null = document.querySelector(".propositions");
let contacts: HTMLElement | null  = document.querySelector(".contact-block");

if (propositions || contacts) {
  let onlineInsuranceBlock: HTMLDivElement | null = document.querySelector(".online-insurance");
  onlineInsuranceBlock!.classList.add('_hide-pc');
}


const cards: HTMLCollection = document.getElementsByClassName("card-offer");
let oldPrices: HTMLCollection = document.getElementsByClassName("price-old");
let serviceNames: HTMLCollection = document.getElementsByClassName("service-name__text");

if (cards) {
  window.addEventListener('resize', cardChange);
}
  
function cardChange(event: UIEvent){
  const prices: HTMLParagraphElement[] =  <HTMLParagraphElement[]> Array.from(oldPrices);
  const titles: HTMLParagraphElement[] = <HTMLParagraphElement[]> Array.from(serviceNames);

  for (let i: number = 0; i <= cards.length; i++) {
    if((event.target as Window).innerWidth <= 768 && i % 2 !== 0) {
      prices[i].style.visibility = 'hidden';
      titles[i].innerText = "Название услуги возможно в две строки";
     } 
  }
  for (let n: number = 0; n <= cards.length;  n++) {
    if((event.target as Window).innerWidth > 768 && n % 2 !== 0) {
      prices[n].style.visibility = 'hidden';
      titles[n].innerText = "Название услуги в 1 строку";
    }
  }
}


const buttonsContainer: HTMLDivElement | null = document.querySelector('.buttons-gray');
const buttonsGroup: HTMLCollection | undefined = buttonsContainer?.getElementsByClassName("button-gray");

if (buttonsGroup) {
  const buttons: HTMLButtonElement[] = <HTMLButtonElement[]> Array.from(buttonsGroup);
  buttons.forEach(button => {
    button.addEventListener("click", clickHandler)});
}

function clickHandler(event: MouseEvent){
  let current: HTMLButtonElement | null = document.querySelector("._active");
  current!.classList.remove("_active");
  (event.target as HTMLElement).classList.add("_active")
}


const spollers: NodeList = document.querySelectorAll('[data-spollers]');

if (spollers.length > 0) {
  const spollersRegular: HTMLDivElement[] = <HTMLDivElement[]>Array.from(spollers);
  initSpollers(spollersRegular);
}

function initSpollers(spollersArray: HTMLDivElement[], matchMedia: boolean = false): void {
  spollersArray.forEach(spollersBlock => {
    if(!matchMedia) {
      spollersBlock.classList.add('_init');
      initSpollerBody(spollersBlock);
      spollersBlock.addEventListener('click', setSpollerAction);
    } else {
      spollersBlock.classList.remove('_init');
      initSpollerBody(spollersBlock, false);
      spollersBlock.removeEventListener('click', setSpollerAction);
    }  
  })
}

function initSpollerBody(spollersBlock: HTMLDivElement, hideSpollerBody: boolean = true): void {
  const spollerTitles: HTMLDivElement[] = Array.from(spollersBlock.querySelectorAll('[data-spoller]'));
  if (spollerTitles.length > 0) {
    spollerTitles.forEach(spollerTitle => {
      if(hideSpollerBody){
        spollerTitle.removeAttribute('tabindex');
        if(!spollerTitle.classList.contains('_active')) {
          (spollerTitle.nextElementSibling as HTMLDivElement).hidden = true;
        }
      } 
      else {
        spollerTitle.setAttribute('tabindex', '-1');
        (spollerTitle.nextElementSibling as HTMLDivElement).hidden = false;
      }
    });
  }
}

function setSpollerAction(event: MouseEvent) {
  const target: HTMLDivElement = <HTMLDivElement>event.target;
  if (target.hasAttribute('data-spoller') || target.closest('[data-spoller]')) {
    const spollerTitle: HTMLDivElement | null = target.hasAttribute('data-spoller') ? target : target.closest('[data-spoller]');
    const spollersBlock: HTMLDivElement | null = spollerTitle!.closest('[data-spollers]');
    const oneSpoller: boolean = spollersBlock!.hasAttribute('data-one-spoller') ? true : false;
    if (oneSpoller && !spollerTitle!.classList.contains('_active')) {
      hideSpollersBody(spollersBlock);
    }
    spollerTitle!.classList.toggle('_active');
    (spollerTitle!.parentNode as HTMLDivElement).classList.toggle('_active');
    if(!spollerTitle!.classList.contains('_active')) {
      (spollerTitle!.nextElementSibling as HTMLDivElement).hidden = true;
    } else {
      spollerTitle!.setAttribute('tabindex', '-1');
      (spollerTitle!.nextElementSibling as HTMLDivElement).hidden = false;
    }
  }
  event.preventDefault();
}

function hideSpollersBody(spollersBlock: HTMLDivElement | null) {
  const spollerActiveTitle: HTMLDivElement | null = spollersBlock!.querySelector('[data-spoller]._active');
  if (spollerActiveTitle) {
    spollerActiveTitle!.classList.remove('_active');
    (spollerActiveTitle.parentNode as HTMLDivElement).classList.remove('_active');
    (spollerActiveTitle.nextElementSibling as HTMLDivElement).hidden = true;
  }
}


const select: HTMLDivElement | null = document.querySelector('.select__header');

if (select) {
  select.addEventListener('click', selectHandler);
  let selectItems: HTMLLIElement[] = Array.from(document.querySelectorAll('.select__item'));
  selectItems.forEach(item => {
    item.addEventListener('click', selectChoose);
  });
  document.body.addEventListener('click', selectClose);
}

function selectHandler (event: MouseEvent): void {
  (event.target as HTMLDivElement).parentElement!.classList.toggle('_active');
}

function selectChoose (event: MouseEvent): void {
  let target: HTMLLIElement = event.target as HTMLLIElement;
  let text: string = target.innerText;
  let select: HTMLDivElement | null = target.closest('.select');
  let currentText: HTMLSpanElement | null = select!.querySelector('.select__current');
  currentText!.innerText = text;
  select!.classList.remove('_active');
}

function selectClose(event: MouseEvent): void {
  let selectParent: HTMLElement | null = select!.parentElement;
  if(selectParent!.classList.contains('_active') && event.target !== select) {
    selectParent!.classList.remove('_active');
  }
}


let userName: HTMLInputElement | null = <HTMLInputElement> document.getElementById('user-name');
if (userName) {
  userName.addEventListener('change', inputValidation);
}

function inputValidation(event: Event): void {
  let error: HTMLParagraphElement | null = document.querySelector('.error');
  let target = event.target as HTMLInputElement;
  if (error) {
    target.style.borderColor = '#D7E1E9';
    error.remove();
  }
  
  if(target.value.length <= 0) {
    target.style.borderColor = '#F7372B';
    let newError: HTMLParagraphElement = generateError('Обязательно для заполнения');
    target.parentElement!.insertAdjacentElement('beforeend', newError);
  } 
}

function generateError(text: string): HTMLParagraphElement {
  var error: HTMLParagraphElement = document.createElement('p');
  error.style.color = '#F6372B';
  error.style.lineHeight = '16px';
  error.style.fontSize = '13px';
  error.className = 'error';
  error.innerHTML = text;
  return error;
}