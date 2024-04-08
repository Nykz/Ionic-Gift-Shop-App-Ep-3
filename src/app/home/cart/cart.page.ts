import { DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonImg,
  IonThumbnail, IonText, IonCol, IonRow, IonListHeader, IonList, IonItemGroup, IonFooter } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonFooter, IonItemGroup, IonList, IonListHeader, IonRow, IonCol, IonText, 
    IonImg,
    IonCard,
    IonIcon,
    IonButton,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonThumbnail,
    DecimalPipe
  ],
})
export class CartPage implements OnInit, OnDestroy {
  previous!: string;
  cartSub!: Subscription;
  model: any = null;
  private router = inject(Router);
  public cartService = inject(CartService);

  constructor() {}

  ngOnInit() {
    this.checkUrl();

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.model = cart;
      },
    });
  }

  checkUrl() {
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop(); // Remove the last segment
    console.log(urlParts);
    this.previous = urlParts.join('/');
    console.log('url: ', this.previous);
  }

  addQuantity(item: any) {
    this.cartService.addQuantity(item);
  }

  subtractQuantity(item: any) {
    this.cartService.subtractQuantity(item);
  }

  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
  }
  
}
