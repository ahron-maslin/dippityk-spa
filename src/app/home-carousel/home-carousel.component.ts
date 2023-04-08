import { Component } from '@angular/core';

import { Comments, COMMENT } from '../shared/comments';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent {

  slides: COMMENT[] = [];

  constructor() { }

  ngOnInit(): void {
    this.slides = Comments;
  }
}
