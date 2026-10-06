import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(
  ScrollTrigger
);


@Component({
  imports: [],
  selector: 'app-cafe',
  styleUrl: './cafe.scss',
  templateUrl: './cafe.html',
})
export class Cafe implements AfterViewInit, OnDestroy {

  @ViewChild('cafeSection')
  cafeSection!: ElementRef<HTMLElement>;

  @ViewChild('cafeImage')
  cafeImage!: ElementRef<HTMLImageElement>;

  @ViewChild('cafeImageFrame')
  cafeImageFrame!: ElementRef<HTMLElement>;


  private ctx?: gsap.Context;

  private mm?: gsap.MatchMedia;


  ngAfterViewInit(): void {

    const section =
      this.cafeSection.nativeElement;


    this.ctx = gsap.context(() => {

      const reducedMotion =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;


      /*
       * Respect user's motion preference.
       */

      if (reducedMotion) {

        gsap.set(
          [
            '.cafe-header .section-number',
            '.cafe-heading .eyebrow',
            '.cafe-heading h2',
            '.cafe-intro',
            '.cafe-visual',
            '.visit-info',
            '.cafe-closing > span',
            '.cafe-closing h3',
            '.sipora-footer'
          ],
          {
            clearProps: 'all'
          }
        );

        return;
      }


      this.mm =
        gsap.matchMedia();


      /* ==========================================
         SECTION INTRO
      ========================================== */

      const intro =
        gsap.timeline({

          scrollTrigger: {
            trigger: section,
            start: 'top 74%',
            once: true
          }

        });


      intro.from(
        '.cafe-header .section-number',
        {
          opacity: 0,
          x: -30,

          duration: 0.7,

          ease:
            'power3.out'
        }
      );


      intro.from(
        '.cafe-heading .eyebrow',
        {
          opacity: 0,
          y: 18,

          duration: 0.6,

          ease:
            'power3.out'
        },

        '-=0.4'
      );


      intro.from(
        '.cafe-heading h2',
        {
          opacity: 0,
          y: 65,
          scale: 0.97,

          duration: 1,

          ease:
            'power4.out'
        },

        '-=0.35'
      );


      intro.from(
        '.cafe-intro',
        {
          opacity: 0,
          y: 24,

          duration: 0.7,

          ease:
            'power3.out'
        },

        '-=0.6'
      );


      /* ==========================================
         DESKTOP / LAPTOP VISIT REVEAL
      ========================================== */

      this.mm.add(
        '(min-width: 901px)',
        () => {

          gsap.from(
            '.cafe-visual',
            {
              opacity: 0,

              x: -48,
              y: 28,

              scale: 0.975,

              duration: 1.05,

              ease:
                'power4.out',

              scrollTrigger: {
                trigger:
                  '.visit-grid',

                start:
                  'top 80%',

                once:
                  true
              }
            }
          );


          gsap.from(
            '.visit-info',
            {
              opacity: 0,

              x: 45,

              duration: 0.95,

              delay: 0.08,

              ease:
                'power4.out',

              scrollTrigger: {
                trigger:
                  '.visit-grid',

                start:
                  'top 80%',

                once:
                  true
              }
            }
          );

        }
      );


      /* ==========================================
         TABLET / MOBILE VISIT REVEAL
      ========================================== */

      this.mm.add(
        '(max-width: 900px)',
        () => {

          gsap.from(
            '.cafe-visual',
            {
              opacity: 0,

              y: 42,

              scale: 0.98,

              duration: 0.9,

              ease:
                'power4.out',

              scrollTrigger: {
                trigger:
                  '.cafe-visual',

                start:
                  'top 88%',

                once:
                  true
              }
            }
          );


          gsap.from(
            '.visit-info',
            {
              opacity: 0,

              y: 35,

              duration: 0.85,

              ease:
                'power3.out',

              scrollTrigger: {
                trigger:
                  '.visit-info',

                start:
                  'top 90%',

                once:
                  true
              }
            }
          );

        }
      );


      /* ==========================================
         CAFE IMAGE PARALLAX
      ========================================== */

      const image =
        this.cafeImage.nativeElement;

      const frame =
        this.cafeImageFrame.nativeElement;


      /*
       * Desktop / tablet parallax.
       */

      this.mm.add(
        '(min-width: 701px)',
        () => {

          gsap.fromTo(
            image,

            {
              yPercent: -4,
              scale: 1.07
            },

            {
              yPercent: 4,
              scale: 1.11,

              ease:
                'none',

              scrollTrigger: {
                trigger:
                  frame,

                start:
                  'top bottom',

                end:
                  'bottom top',

                scrub:
                  1.1
              }
            }
          );

        }
      );


      /*
       * Mobile par lighter parallax.
       */

      this.mm.add(
        '(max-width: 700px)',
        () => {

          gsap.fromTo(
            image,

            {
              yPercent: -2,
              scale: 1.045
            },

            {
              yPercent: 2,
              scale: 1.065,

              ease:
                'none',

              scrollTrigger: {
                trigger:
                  frame,

                start:
                  'top bottom',

                end:
                  'bottom top',

                scrub:
                  0.55
              }
            }
          );

        }
      );


      /* ==========================================
         CLOSING STATEMENT
      ========================================== */

      const closing =
        gsap.timeline({

          scrollTrigger: {
            trigger:
              '.cafe-closing',

            start:
              'top 86%',

            once:
              true
          }

        });


      closing.from(
        '.cafe-closing > span',
        {
          opacity: 0,

          y: 18,

          duration: 0.6,

          ease:
            'power3.out'
        }
      );


      closing.from(
        '.cafe-closing h3',
        {
          opacity: 0,

          y: 55,

          scale: 0.97,

          duration: 1,

          ease:
            'power4.out'
        },

        '-=0.3'
      );


      /* ==========================================
         FOOTER
      ========================================== */

      gsap.from(
        '.sipora-footer',
        {
          opacity: 0,

          y: 38,

          duration: 0.9,

          ease:
            'power3.out',

          scrollTrigger: {
            trigger:
              '.sipora-footer',

            start:
              'top 92%',

            once:
              true
          }
        }
      );

    }, section);


    requestAnimationFrame(() => {

      ScrollTrigger.refresh();

    });

  }


  ngOnDestroy(): void {

    this.mm?.revert();

    this.ctx?.revert();

  }

}