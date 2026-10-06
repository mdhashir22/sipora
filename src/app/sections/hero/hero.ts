import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { gsap } from 'gsap';


@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements AfterViewInit, OnDestroy {

  @ViewChild('heroSection')
  heroSection!: ElementRef<HTMLElement>;

  @ViewChild('productStage')
  productStage!: ElementRef<HTMLElement>;

  @ViewChild('heroProduct')
  heroProduct!: ElementRef<HTMLImageElement>;

  @ViewChild('leftCopy')
  leftCopy!: ElementRef<HTMLElement>;

  @ViewChild('rightCopy')
  rightCopy!: ElementRef<HTMLElement>;

  @ViewChild('mobileCopy')
  mobileCopy!: ElementRef<HTMLElement>;

  @ViewChild('heroBottom')
  heroBottom!: ElementRef<HTMLElement>;


  private gsapContext?: gsap.Context;


  ngAfterViewInit(): void {

    this.gsapContext = gsap.context(() => {

      const stage =
        this.productStage.nativeElement;

      const product =
        this.heroProduct.nativeElement;

      const leftCopy =
        this.leftCopy.nativeElement;

      const rightCopy =
        this.rightCopy.nativeElement;

      const mobileCopy =
        this.mobileCopy.nativeElement;

      const heroBottom =
        this.heroBottom.nativeElement;


      /*
       * =========================================
       * DEVICE / MOTION CHECKS
       * =========================================
       */

      const desktopPointer =
        window.matchMedia(
          '(hover: hover) and (pointer: fine)'
        ).matches;

      const mobileLayout =
        window.matchMedia(
          '(max-width: 650px)'
        ).matches;

      const reducedMotion =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;


      /*
       * =========================================
       * CINEMATIC INTRO
       * =========================================
       */

      if (!reducedMotion) {

        const intro = gsap.timeline({
          defaults: {
            ease: 'power4.out'
          }
        });


        intro.from(leftCopy, {
          x: mobileLayout ? 0 : -55,
          y: mobileLayout ? 28 : 0,
          opacity: 0,
          duration: 1
        });


        intro.from(product, {
          y: 40,
          scale: 0.9,
          opacity: 0,
          duration: 1.15
        }, '-=0.7');


        /*
         * Desktop and mobile have
         * different secondary copy.
         */

        if (mobileLayout) {

          intro.from(mobileCopy, {
            y: 25,
            opacity: 0,
            duration: 0.8
          }, '-=0.65');

        } else {

          intro.from(rightCopy, {
            x: 55,
            opacity: 0,
            duration: 1
          }, '-=0.8');

        }


        intro.from(heroBottom, {
          y: 16,
          opacity: 0,
          duration: 0.7
        }, '-=0.45');

      }


      /*
       * =========================================
       * IDLE PRODUCT FLOAT
       * =========================================
       */

      if (!reducedMotion) {

        gsap.to(product, {
          y: mobileLayout ? -4 : -5,

          duration:
            mobileLayout ? 3.8 : 3.2,

          ease:
            'sine.inOut',

          repeat:
            -1,

          yoyo:
            true,

          delay:
            1.3
        });

      }


      /*
       * =========================================
       * DESKTOP-ONLY 3D INTERACTION
       * =========================================
       *
       * No mouse tilt on phones/tablets.
       */

      if (!desktopPointer || reducedMotion) {
        return;
      }


      const rotateX =
        gsap.quickTo(
          product,
          'rotationX',
          {
            duration: 0.65,
            ease: 'power3.out'
          }
        );


      const rotateY =
        gsap.quickTo(
          product,
          'rotationY',
          {
            duration: 0.65,
            ease: 'power3.out'
          }
        );


      const rotateZ =
        gsap.quickTo(
          product,
          'rotationZ',
          {
            duration: 0.65,
            ease: 'power3.out'
          }
        );


      const moveX =
        gsap.quickTo(
          product,
          'x',
          {
            duration: 0.65,
            ease: 'power3.out'
          }
        );


      /*
       * Mouse move
       */

      const handleMouseMove =
        (event: MouseEvent) => {

          const rect =
            stage.getBoundingClientRect();

          const mouseX =
            (
              event.clientX -
              rect.left
            ) /
            rect.width;

          const mouseY =
            (
              event.clientY -
              rect.top
            ) /
            rect.height;


          const normalizedX =
            mouseX - 0.5;

          const normalizedY =
            mouseY - 0.5;


          rotateY(
            normalizedX * 10
          );

          rotateX(
            normalizedY * -7
          );

          rotateZ(
            normalizedX * -2
          );

          moveX(
            normalizedX * 8
          );

        };


      /*
       * Mouse enter
       */

      const handleMouseEnter =
        () => {

          gsap.to(product, {
            scale: 1.045,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto'
          });

        };


      /*
       * Mouse leave
       */

      const handleMouseLeave =
        () => {

          rotateX(0);
          rotateY(0);
          rotateZ(0);
          moveX(0);


          gsap.to(product, {
            scale: 1,
            duration: 0.75,
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto'
          });

        };


      stage.addEventListener(
        'mousemove',
        handleMouseMove
      );


      stage.addEventListener(
        'mouseenter',
        handleMouseEnter
      );


      stage.addEventListener(
        'mouseleave',
        handleMouseLeave
      );


      /*
       * Event cleanup is added to
       * GSAP context cleanup.
       */

      this.gsapContext?.add(() => {

        stage.removeEventListener(
          'mousemove',
          handleMouseMove
        );


        stage.removeEventListener(
          'mouseenter',
          handleMouseEnter
        );


        stage.removeEventListener(
          'mouseleave',
          handleMouseLeave
        );

      });

    }, this.heroSection.nativeElement);

  }


  ngOnDestroy(): void {

    this.gsapContext?.revert();

  }

}