import { Component } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { Flavours } from './sections/flavours/flavours';
import { DrinkBuilder } from './sections/drink-builder/drink-builder';
import { Story } from './sections/story/story';
import { Cafe } from './sections/cafe/cafe';

@Component({
  selector: 'app-root',
  imports: [
  Navbar,
  Hero,
  Flavours,
  DrinkBuilder,
  Story,
  Cafe
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}