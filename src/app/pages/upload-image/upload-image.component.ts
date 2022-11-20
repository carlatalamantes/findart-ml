import { Component } from '@angular/core';
import SwiperCore, { Virtual, Scrollbar} from 'swiper';
import paintingsResults from 'src/app/utils/paintingsResults';

SwiperCore.use([Virtual, Scrollbar]);


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],

})
export class UploadImageComponent {
  selectedFile = null;
  preview!: string;
  relatedPaintings: any[] = [];
  relatedMovement: string = '';
  relatedMovementDescription: string = '';
  loading: boolean = false;

  breakpoints = {
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }

  constructor() { }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();

        reader.onload = (event:any) => {
            this.preview = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
  }
  onFileSubmit() {
    //this.loading = true;
    this.getRelatedPaintings('Impressionism');
   /*  setTimeout(() => {
      this.loading = false;
    }, 3000);
 */

  }

  getRelatedPaintings(artisticMovementResult: string){
    this.relatedMovement = paintingsResults.filter(painting => painting.artisticMovement === artisticMovementResult).map(painting => painting.artisticMovement)[0];
    this.relatedMovementDescription = paintingsResults.filter(painting => painting.artisticMovement === artisticMovementResult).map(painting => painting.description)[0];
    this.relatedPaintings = paintingsResults.filter(painting => painting.artisticMovement === artisticMovementResult).map(painting => painting.data);
    console.log(this.relatedPaintings)
  }

  

}
