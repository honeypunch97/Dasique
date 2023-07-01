(function () {
   const formatNum = price => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };
   const visual = () => {
      let visualSwiper = new Swiper('.visual-swiper', {
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         loop: true,
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
         },

         slidesPerView: 1,
         spaceBetween: 0,
      });
   };
   const aside = () => {
      const topBtn = document.querySelector('aside .top-btn');

      window.addEventListener('scroll', function () {
         if (window.pageYOffset > 200) {
            topBtn.style.right = '0';
         } else {
            topBtn.style.right = '-200px';
         }
      });

      topBtn.addEventListener('click', function () {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      });
   };
   const bestSellers = () => {
      let prevIdx = 0;
      const categoryItems = document.querySelectorAll('.best-sellers .category li');
      const bestSellersSwiperWrapper = document.querySelector('.best-sellers-swiper .swiper-wrapper');

      let bestSellersSwiper = new Swiper('.best-sellers-swiper', {
         loop: true,
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
         },
         slidesPerView: 1,
         spaceBetween: 0,
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
      });

      const makeSlideContent = item => {
         const productItem = document.createElement('div');
         productItem.classList.add('item');
         const link = document.createElement('a');
         link.setAttribute('href', '#');
         const img = document.createElement('img');
         img.setAttribute('src', item.img);
         img.setAttribute('alt', item.title);
         const title = document.createElement('strong');
         title.textContent = item.title;
         const priceWrap = document.createElement('p');
         const originPrice = document.createElement('em');
         originPrice.textContent = formatNum(item.originPrice) + '원';
         const discountedPrice = document.createElement('em');
         discountedPrice.textContent = formatNum(item.discountedPrice) + '원';
         priceWrap.append(originPrice, discountedPrice);
         link.append(img, title, priceWrap);
         productItem.append(link);
         return productItem;
      };

      const addSwiperSlide = swiperSlide => {
         bestSellersSwiperWrapper.append(swiperSlide);
      };

      categoryItems.forEach((item, idx) =>
         item.addEventListener('click', e => {
            const category = e.target.textContent;
            categoryItems[prevIdx].classList.remove('on');
            categoryItems[idx].classList.add('on');
            prevIdx = idx;

            bestSellersSwiperWrapper.innerHTML = '';

            axios.get('./data/shopData.json').then(res => {
               let swiperSlide = document.createElement('div');
               swiperSlide.classList.add('swiper-slide');
               let itemCounter = 0;

               res.data.forEach(item => {
                  if (category === 'all' || category === item.category) {
                     swiperSlide.append(makeSlideContent(item));
                     itemCounter++;

                     if (itemCounter % 5 === 0) {
                        addSwiperSlide(swiperSlide);
                        swiperSlide = document.createElement('div');
                        swiperSlide.classList.add('swiper-slide');
                     }
                  }
               });

               if (itemCounter % 5 !== 0) {
                  addSwiperSlide(swiperSlide);
               }
            });

            setTimeout(() => {
               if (bestSellersSwiper.slides.length <= 2) {
                  bestSellersSwiper.loop = false;
                  bestSellersSwiper.autoplay.stop();
               } else {
                  bestSellersSwiper.loop = true;
                  bestSellersSwiper.autoplay.start();
               }
               bestSellersSwiper.update();
               bestSellersSwiper.slideTo(0);
            }, 100);
         }),
      );

      categoryItems[0].dispatchEvent(new Event('click'));
   };
   const collection = () => {
      let collectionSwiper = new Swiper('.collection-swiper', {
         slidesPerView: 1,
         spaceBetween: 0,
         loop: true,
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
         },
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
      });
   };
   const review = () => {
      let prevIdx = 0;
      const categoryItems = document.querySelectorAll('.review .category li');
      const reviewSwiperWrapper = document.querySelector('.review-swiper .swiper-wrapper');

      let reviewSwiper = new Swiper('.review-swiper', {
         loop: true,
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
         },
         slidesPerView: 1,
         spaceBetween: 0,
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
      });
      const makeSlideContent = item => {
         const reviewItem = document.createElement('div');
         reviewItem.classList.add('slide-item');
         const link = document.createElement('a');
         link.setAttribute('href', '#');
         const img = document.createElement('img');
         img.setAttribute('src', item.img);
         img.setAttribute('alt', img.title);
         const thumBox = document.createElement('div');
         thumBox.classList.add('thum-box');
         const thumImg = document.createElement('img');
         thumImg.setAttribute('src', item.thumImg);
         thumImg.setAttribute('alt', item.title);
         const textBox = document.createElement('div');
         textBox.classList.add('text-box');
         const title = document.createElement('strong');
         title.textContent = item.title;
         const scoreWrap = document.createElement('p');
         scoreWrap.classList.add('score-wrap');
         const score = document.createElement('span');
         score.textContent = item.score;
         const review = document.createElement('span');
         review.textContent = formatNum(item.review);
         const comment = document.createElement('p');
         comment.textContent = item.comment;
         const starScore = document.createElement('span');
         starScore.classList.add('star-score');
         let star = ``;
         for (let i = 0; i < Math.floor(item.score); i++) {
            star += `  <i class="xi-star"></i>`;
         }
         for (let i = 0; i < 5 - Math.floor(item.score); i++) {
            star += `  <i class="xi-star-o"></i>`;
         }
         starScore.innerHTML = star;
         const date = document.createElement('span');
         date.classList.add('date');
         date.textContent = item.date;
         scoreWrap.append(score, review);
         textBox.append(title, scoreWrap);
         thumBox.append(thumImg, textBox);
         link.append(img, thumBox, comment, starScore, date);
         reviewItem.append(link);
         return reviewItem;
      };

      const addSwiperSlide = swiperSlide => {
         reviewSwiperWrapper.append(swiperSlide);
      };

      categoryItems.forEach((item, idx) =>
         item.addEventListener('click', e => {
            const category = e.target.textContent;
            categoryItems[prevIdx].classList.remove('on');
            categoryItems[idx].classList.add('on');
            prevIdx = idx;

            reviewSwiperWrapper.innerHTML = '';

            axios.get('./data/review.json').then(res => {
               let swiperSlide = document.createElement('div');
               swiperSlide.classList.add('swiper-slide');
               let itemCounter = 0;

               res.data.forEach(item => {
                  if (category === 'all' || category === item.category) {
                     swiperSlide.append(makeSlideContent(item));
                     itemCounter++;

                     if (itemCounter % 5 === 0) {
                        addSwiperSlide(swiperSlide);
                        swiperSlide = document.createElement('div');
                        swiperSlide.classList.add('swiper-slide');
                     }
                  }
               });

               if (itemCounter % 5 !== 0) {
                  addSwiperSlide(swiperSlide);
               }
            });

            setTimeout(() => {
               if (reviewSwiper.slides.length <= 2) {
                  reviewSwiper.loop = false;
                  reviewSwiper.autoplay.stop();
               } else {
                  reviewSwiper.loop = true;
                  reviewSwiper.autoplay.start();
               }
               reviewSwiper.update();
               reviewSwiper.slideTo(0);
            }, 100);
         }),
      );

      categoryItems[0].dispatchEvent(new Event('click'));
   };
   const blooming = () => {
      window.addEventListener('scroll', function () {
         const scrollingText = document.querySelector('.scrolling-text');
         const leftPosition = -window.pageYOffset * 0.15 + 'px'; // 조절 가능한 곱셈 값 (0.5)를 변경하여 이동속도 조절
         scrollingText.style.left = leftPosition;
      });
   };
   const init = () => {
      visual();
      aside();
      bestSellers();
      collection();
      review();
      blooming();
   };

   init();
})();
