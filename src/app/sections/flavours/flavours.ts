import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);


@Component({
  imports: [],
  selector: 'app-flavours',
  styleUrl: './flavours.scss',
  templateUrl: './flavours.html',
})
export class Flavours implements AfterViewInit, OnDestroy {

  @ViewChild('flavoursSection')
  flavoursSection!: ElementRef<HTMLElement>;


  private ctx?: gsap.Context;


  ngAfterViewInit(): void {

    const section =
      this.flavoursSection.nativeElement;


    this.ctx = gsap.context(() => {

      const reducedMotion =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;


      const mobile =
        window.matchMedia(
          '(max-width: 650px)'
        ).matches;


      /*
       * =========================================
       * REDUCED MOTION
       * =========================================
       */

      if (reducedMotion) {
        return;
      }


      /*
       * =========================================
       * ELEMENTS
       * =========================================
       */

      const cards =
        gsap.utils.toArray<HTMLElement>(
          '.flavour-card'
        );


      const products =
        gsap.utils.toArray<HTMLElement>(
          '.flavour-product'
        );


      const auras =
        gsap.utils.toArray<HTMLElement>(
          '.product-aura'
        );


      /*
       * =========================================
       * SECTION INTRO
       * =========================================
       */

      const timeline =
        gsap.timeline({

          scrollTrigger: {
            trigger: section,

            start:
              mobile
                ? 'top 82%'
                : 'top 72%',

            once: true
          }

        });


      /*
       * 02 / FLAVOURS
       */

      timeline.from(
        '.section-number',
        {
          opacity: 0,

          x:
            mobile
              ? -18
              : -35,

          duration:
            mobile
              ? 0.65
              : 0.8,

          ease:
            'power3.out',

          clearProps:
            'opacity,transform'
        }
      );


      /*
       * FIND YOUR SIGNATURE
       */

      timeline.from(
        '.heading-wrap .eyebrow',
        {
          opacity: 0,

          y:
            mobile
              ? 14
              : 20,

          duration:
            0.6,

          ease:
            'power3.out',

          clearProps:
            'opacity,transform'
        },
        '-=0.4'
      );


      /*
       * CHOOSE YOUR MOOD
       */

      timeline.from(
        '.heading-wrap h2',
        {
          opacity: 0,

          y:
            mobile
              ? 38
              : 65,

          duration:
            mobile
              ? 0.85
              : 1,

          ease:
            'power4.out',

          clearProps:
            'opacity,transform'
        },
        '-=0.32'
      );


      /*
       * DESCRIPTION
       */

      timeline.from(
        '.section-description',
        {
          opacity: 0,

          y:
            mobile
              ? 16
              : 25,

          duration:
            0.7,

          ease:
            'power3.out',

          clearProps:
            'opacity,transform'
        },
        '-=0.6'
      );


      /*
       * =========================================
       * CARDS
       * =========================================
       */

      timeline.from(
        cards,
        {
          opacity: 0,

          y:
            mobile
              ? 42
              : 85,

          scale:
            mobile
              ? 0.985
              : 0.96,

          duration:
            mobile
              ? 0.75
              : 1,

          stagger:
            mobile
              ? 0.08
              : 0.13,

          ease:
            'power4.out',

          clearProps:
            'opacity,transform'
        },
        '-=0.3'
      );


      /*
       * =========================================
       * PRODUCTS
       * =========================================
       */

      timeline.from(
        products,
        {
          opacity: 0,

          y:
            mobile
              ? 20
              : 35,

          scale:
            mobile
              ? 0.94
              : 0.88,

          duration:
            mobile
              ? 0.7
              : 0.9,

          stagger:
            mobile
              ? 0.06
              : 0.1,

          ease:
            'back.out(1.2)',

          clearProps:
            'opacity,transform'
        },
        '-=0.65'
      );


      /*
       * =========================================
       * PRODUCT AURAS
       * =========================================
       */

      timeline.from(
        auras,
        {
          opacity: 0,

          scale: 0.7,

          duration: 0.9,

          stagger: 0.06,

          ease:
            'power3.out',

          clearProps:
            'opacity,transform'
        },
        '-=0.85'
      );


      /*
       * =========================================
       * FINAL CLEANUP
       *
       * Important:
       * Remove GSAP inline transform values after
       * the reveal so CSS :hover owns transforms.
       * =========================================
       */

      timeline.call(() => {

        gsap.set(cards, {
          clearProps:
            'transform,opacity'
        });


        gsap.set(products, {
          clearProps:
            'transform,opacity'
        });


        gsap.set(auras, {
          clearProps:
            'transform,opacity'
        });

      });


    }, section);


    ScrollTrigger.refresh();

  }


  ngOnDestroy(): void {

    this.ctx?.revert();

  }

}