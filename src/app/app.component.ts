import { Component, OnInit, Query } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { trigger, transition, animate, style, query, group } from '@angular/animations';
import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
  ],
  exports: [RouterModule],

  providers: [],
})
export class AppModule { }

const baseStyles =   style({
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ] , { optional:true}),


        group([
          query(':leave',[
            animate(200, style({
              opacity: 0,
              transform: 'translateX(-80px)',
            }))
          ],  {  optional: true }),
  
  
          query(':enter', [
            style({
              transform: 'translateX(80px)',
              opacity: 0
            }),
            animate('200ms ease-in', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])

      ]),
      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ] , { optional:true}),


        group([
          query(':leave',[
            animate(200, style({
              opacity: 0,
              transform: 'translateX(50px)',
            }))
          ],  {  optional: true }),
  
  
          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('200ms ease-in', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])

      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
          //overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ] , { optional:true}),


        group([
          query(':leave',[
            animate(200, style({
              opacity: 0,
              transform: 'scale(0.8)',
            }))
          ],  {  optional: true }),
  
  
          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('200ms ease-in', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
          //overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ] , { optional:true}),


        group([
          query(':leave',[
            animate(200, style({
              opacity: 0,
              transform: 'scale(1.25)',
            }))
          ],  {  optional: true }),
  
  
          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('200ms ease-in', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),

    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity:0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate(250, style ({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  backgrounds: string [] = ['https://images.unsplash.com/photo-1520958522378-6fa2c169e858?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8c3Vuc2V0P2Nsb3Vkcz9kYXJrfHx8fHx8MTY4NDg0MDU0Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920']

  loadingBGImage!: boolean

  dateTime!: Observable<Date>

  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe (
      map(() => {
        return new Date()
      })
      )
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData ['tab']
      if (!tab) return 'secondary'
      return tab
    }
  }

  async changeBGImage(): Promise<void> {
    this.loadingBGImage = true

    const result = await fetch('https://source.unsplash.com/random/1920x1080/?lightning', {
      method:'HEAD'
    })
  
    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      return this.changeBGImage()
    }
  
    this.backgrounds.push(result.url)
  }

  onBGImageLoad(imgEvent: Event) {
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)

    this.loadingBGImage = false
  }
}  