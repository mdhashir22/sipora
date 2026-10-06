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
  selector: 'app-story',
  styleUrl: './story.scss',
  templateUrl: './story.html',
})
export class Story implements AfterViewInit, OnDestroy {

  @ViewChild('storySection')
  storySection!: ElementRef<HTMLElement>;

  @ViewChild('storyImage')
  storyImage!: ElementRef<HTMLImageElement>;

  @ViewChild('visualFrame')
  visualFrame!: ElementRef<HTMLElement>;


  private ctx?: gsap.Context;

  private mm?: gsap.MatchMedia;


  ngAfterViewInit(): void {

    const section =
      this.storySection.nativeElement;


    this.ctx = gsap.context(() => {

      const reducedMotion =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;


      /*
       * If reduced motion is enabled,
       * keep everything visible and static.
       */

      if (reducedMotion) {

        gsap.set(
          [
            '.story-top',
            '.story-heading h2',
            '.story-copy',
            '.story-visual',
            '.story-facts',
            '.story-statement',
            '.story-statement h3'
          ],
          {
            clearProps: 'all'
          }
        );

        return;
      }


      /* =================================================
         MAIN REVEAL
      ================================================= */

      const tl =
        gsap.timeline({

          scrollTrigger: {
            trigger: section,
            start: 'top 74%',
            once: true
          }

        });


      tl.from(
        '.story-top',
        {
          opacity: 0,
          y: 20,

          duration: 0.7,

          ease:
            'power3.out'
        }
      );


      tl.from(
        '.story-heading h2',
        {
          opacity: 0,
          y: 70,
          scale: 0.97,

          duration: 1.05,

          ease:
            'power4.out'
        },

        '-=0.35'
      );


      /*
       * Responsive animation rules.
       */

      this.mm =
        gsap.matchMedia();


      /* -----------------------------------------------
         DESKTOP / LAPTOP
      ------------------------------------------------ */

      this.mm.add(
        '(min-width: 851px)',
        () => {

          tl.from(
            '.story-copy',
            {
              opacity: 0,
              x: -42,

              duration: 0.9,

              ease:
                'power3.out'
            },

            '-=0.55'
          );


          tl.from(
            '.story-visual',
            {
              opacity: 0,
              y: 60,
              scale: 0.95,

              duration: 1,

              ease:
                'power4.out'
            },

            '-=0.72'
          );


          tl.from(
            '.story-facts',
            {
              opacity: 0,
              x: 42,

              duration: 0.9,

              ease:
                'power3.out'
            },

            '-=0.72'
          );

        }
      );


      /* -----------------------------------------------
         TABLET / MOBILE
      ------------------------------------------------ */

      this.mm.add(
        '(max-width: 850px)',
        () => {

          tl.from(
            '.story-copy',
            {
              opacity: 0,
              y: 35,

              duration: 0.8,

              ease:
                'power3.out'
            },

            '-=0.5'
          );


          tl.from(
            '.story-visual',
            {
              opacity: 0,
              y: 45,
              scale: 0.97,

              duration: 0.9,

              ease:
                'power4.out'
            },

            '-=0.55'
          );


          tl.from(
            '.story-facts',
            {
              opacity: 0,
              y: 35,

              duration: 0.8,

              ease:
                'power3.out'
            },

            '-=0.5'
          );

        }
      );


      /* =================================================
         IMAGE PARALLAX
      ================================================= */

      const image =
        this.storyImage.nativeElement;

      const frame =
        this.visualFrame.nativeElement;


      /*
       * Desktop gets stronger parallax.
       */

      this.mm.add(
        '(min-width: 651px)',
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

              ease: 'none',

              scrollTrigger: {
                trigger: frame,

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
       * Mobile gets lighter movement
       * for smoother performance.
       */

      this.mm.add(
        '(max-width: 650px)',
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

              ease: 'none',

              scrollTrigger: {
                trigger: frame,

                start:
                  'top bottom',

                end:
                  'bottom top',

                scrub:
                  0.6
              }
            }
          );

        }
      );


      /* =================================================
         BOTTOM STATEMENT
      ================================================= */

      gsap.from(
        '.story-statement',
        {
          opacity: 0,
          y: 45,

          duration: 0.9,

          ease:
            'power4.out',

          scrollTrigger: {
            trigger:
              '.story-statement',

            start:
              'top 88%',

            once:
              true
          }
        }
      );


      gsap.from(
        '.story-statement h3',
        {
          opacity: 0,
          y: 35,

          duration: 1,

          ease:
            'power4.out',

          scrollTrigger: {
            trigger:
              '.story-statement',

            start:
              'top 84%',

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