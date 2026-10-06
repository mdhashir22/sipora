import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { gsap } from 'gsap';


interface Flavour {

  name: string;

  productName: string;

  type: string;

  mood: string;

  description: string;

  image: string;

}


@Component({
  imports: [],
  selector: 'app-drink-builder',
  styleUrl: './drink-builder.scss',
  templateUrl: './drink-builder.html',
})
export class DrinkBuilder {

  @ViewChild('drinkImage')
  drinkImage!: ElementRef<HTMLImageElement>;

  @ViewChild('flavourDetails')
  flavourDetails!: ElementRef<HTMLElement>;


  selectedFlavour =
    'Caramel';


  flavours: Flavour[] = [

    {
      name: 'Caramel',

      productName:
        'Caramel Cloud',

      type:
        'Signature Frappé',

      mood:
        'Golden Hour',

      description:
        'Velvety coffee, vanilla cream and golden caramel.',

      image:
        '/images/flavours/caramel-cloud.png'
    },


    {
      name:
        'Vanilla',

      productName:
        'Vanilla Dream',

      type:
        'Cream Frappé',

      mood:
        'Soft Escape',

      description:
        'Smooth vanilla cream with a rich, silky finish.',

      image:
        '/images/flavours/vanilla-dream.png'
    },


    {
      name:
        'Strawberry',

      productName:
        'Strawberry Dream',

      type:
        'Cream Frappé',

      mood:
        'Sweet Energy',

      description:
        'Sweet berries, soft cream and a silky chilled finish.',

      image:
        '/images/flavours/strawberry-dream.png'
    },


    {
      name:
        'Mocha',

      productName:
        'Midnight Mocha',

      type:
        'Dark Frappé',

      mood:
        'After Hours',

      description:
        'Deep cocoa, roasted espresso and dark chocolate.',

      image:
        '/images/flavours/midnight-mocha.png'
    },


    {
      name:
        'Matcha',

      productName:
        'Matcha Mist',

      type:
        'Matcha Frappé',

      mood:
        'Slow Morning',

      description:
        'Earthy matcha, fresh milk and smooth vanilla cream.',

      image:
        '/images/flavours/matcha-mist.png'
    }

  ];


  /* =====================================================
     CURRENT FLAVOUR
  ===================================================== */

  get currentFlavour(): Flavour {

    return (

      this.flavours.find(
        flavour =>
          flavour.name ===
          this.selectedFlavour
      )

      ?? this.flavours[0]

    );

  }


  /* =====================================================
     CURRENT PRODUCT IMAGE
  ===================================================== */

  get currentDrinkImage(): string {

    return this.currentFlavour.image;

  }


  /* =====================================================
     SELECT FLAVOUR
  ===================================================== */

  selectFlavour(name: string): void {

    if (
      this.selectedFlavour === name
    ) {
      return;
    }


    /*
     * Angular state is updated first.
     * This keeps the first click responsive.
     */

    this.selectedFlavour =
      name;


    /*
     * Wait until Angular has updated
     * the image source and summary text.
     */

    requestAnimationFrame(() => {

      const image =
        this.drinkImage?.nativeElement;

      const details =
        this.flavourDetails?.nativeElement;


      if (!image) {
        return;
      }


      const reducedMotion =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;


      /*
       * No decorative motion when the
       * user requests reduced motion.
       */

      if (reducedMotion) {

        gsap.set(
          image,
          {
            clearProps:
              'transform,opacity'
          }
        );


        if (details) {

          gsap.set(
            details,
            {
              clearProps:
                'transform,opacity'
            }
          );

        }

        return;
      }


      /*
       * Stop previous transitions.
       */

      gsap.killTweensOf(
        image
      );


      if (details) {

        gsap.killTweensOf(
          details
        );

      }


      /*
       * Product transition.
       */

      gsap.fromTo(
        image,

        {
          opacity:
            0,

          scale:
            0.9,

          y:
            22,

          rotation:
            2.5
        },

        {
          opacity:
            1,

          scale:
            1,

          y:
            0,

          rotation:
            0,

          duration:
            0.55,

          ease:
            'back.out(1.3)',

          overwrite:
            true
        }
      );


      /*
       * Summary transition.
       */

      if (details) {

        gsap.fromTo(
          details,

          {
            opacity:
              0,

            y:
              14
          },

          {
            opacity:
              1,

            y:
              0,

            duration:
              0.45,

            ease:
              'power3.out',

            overwrite:
              true
          }
        );

      }

    });

  }


  /* =====================================================
     SELECTED STATE
  ===================================================== */

  isSelected(
    name: string
  ): boolean {

    return (
      this.selectedFlavour ===
      name
    );

  }

}