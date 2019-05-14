import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { CheckOutService } from 'app/shopping/services/check-out.service';
import { FormsModule }   from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnDestroy {

  public payPalConfig?: IPayPalConfig;
  paid:boolean;

  product:Product= {
    $key:null,
    category:null,
    numBuyers:null,
    numBuyersRequired:null,
    price:null,
    description:null,
    buyers:{},
    tags:{},
    imageUrl:null,
    images: {},
    title:null
  };

  quantity:number;
  productId:string;
  
  paramSub: Subscription;
  productSub: Subscription;

  price:number;
  tax:number;
  total:number;



  constructor(
    private productService: ProductService, 
    private checkOutService: CheckOutService, 
    private route: ActivatedRoute,
    private router: Router
    ) {
    
    this.paid = false;

    // Subscribe to get the route parameters 
    this.paramSub = route.queryParams.subscribe(params => {
    this.productId = params.productId;
    this.quantity = params.quantity;
    });

    // Get the product
    this.productSub = productService.get(this.productId).valueChanges().subscribe(product => {
      this.product = product;
      this.product.$key = this.productId;
      this.calculatePrice();

      // Initialize paypal
      this.initConfig(this.total.toFixed(2).toString(), this.product.title);
    });
  }

  // Calculate price, tax, total
  calculatePrice() {
    this.price =  this.product.price * this.quantity;
    this.tax = this.price * 0.13;
    this.total = this.price + this.tax;
  }

  // Place order
  order(shippingInfo) {
    this.checkOutService.order(this.product, this.quantity, shippingInfo);
    this.router.navigate(['/order-success'])
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.productSub.unsubscribe();
  }

  private initConfig(total:string, title:string): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'AQyQ7f-8R23ovzHJEJRlz3rz8XHx9SHgQsZv3L9KKOpy55kiFLaq4JP5GqrPaea2am7R77wagH7mI_6r',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: total
              }
            }
          },
          items: [
            {
              name: title,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: total,
              },
            }
          ]
        }
      ]
    },
    advanced: {
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.paid = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: () => {
      console.log('onClick');
    },
  };
  }



}
