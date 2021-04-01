import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { courses as courseList } from './test';
import { FlashCard } from './flashcard.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('question') question!: ElementRef<HTMLDivElement>;
  @ViewChild('answer') answer!: ElementRef<HTMLDivElement>;

  course = '';
  courseNames: string[];
  hideAnswer = true;
  private cards: FlashCard[] = [];
  private courses: any = courseList;
  private index = 0;

  constructor() {
    this.courseNames = Object.keys(courseList);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.course = this.courseNames ? this.courseNames[0] : '';
    this.changeCourse(this.course);
    this.renderCard();
  }

  changeCourse(course: string): void {
    if (this.courses[course]) {
      this.cards = this.courses[course];
    }
  }

  renderCard(): void {
    this.hideAnswer = true;
    if (this.cards[this.index]) {
      const { question, answer } = this.cards[this.index];
      this.question.nativeElement.innerHTML = question;
      this.answer.nativeElement.innerHTML = answer;
    }
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  switchCard(inc: number): void {
    const cl = this.cards.length;
    if (!inc) inc = this.randomNumber(1, cl - 1);
    this.index = (this.index + inc) % cl;
    if (this.index < 0) this.index = cl - 1;
    this.renderCard();
  }
}
