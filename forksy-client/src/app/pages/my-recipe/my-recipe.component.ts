import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-recipe',
  imports: [ShareModule, MaterialModule],
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.scss'
})


export class MyRecipeComponent {
  myRecipes = [
    {
      id: '1',
      title: 'Pho',
      description: 'Phở is the quintessential Vietnamese dish, the word phở referring to the type of noodle used in the recipe. Flat rice noodles dance around with medium-rare slivers of beef or boiled chicken in a hearty beef stock. The more popular of the two widely known varieties is phở Hanoi. ',
      date: '21-8-2025',
      image: 'https://vietnam.travel/sites/default/files/inline-images/top-vietnamese-dishes-2_2.jpg',
      isFavoriteActive: false
    },
    {
      id: '2',
      title: 'Bun Cha',
      description: 'Bún chả became an overnight sensation after President Obama was pictured scarfing down a bowl of these grilled pork patties with Anthony Bourdain. But this speciality of the Old Quarter in Hanoi has always been popular among the locals.',
      date: '21-8-2025',
      image: 'https://vietnam.travel/sites/default/files/inline-images/Must%20try%20Vietnamese%20Dishes-2_1.jpg',
      isFavoriteActive: false
    },
    {
      id: '3',
      title: 'Bun Dau Mam Tom',
      description: 'Bún đậu mắm tôm is a signature Northern Vietnamese street food, featuring rice vermicelli, crispy fried tofu, boiled pork, and fresh herbs. Its highlight is the bold mắm tôm (fermented shrimp paste) mixed with lime, chili, and sugar, creating a rich and unforgettable flavor. Simple yet iconic, this dish captures the vibrant essence of Vietnamese cuisine.s.',
      date: '21-8-2025',
      image: 'https://img5.thuthuatphanmem.vn/uploads/2021/11/24/hinh-anh-bun-dau-mam-tom-cuc-ngon-va-dep_101743783.jpg',
      isFavoriteActive: false
    },
    {
      id: '4',
      title: 'Bun Rieu',
      description: "The interplay between crab and tomato makes bún riêu a truly standout dish. A hearty soup bursting with acidity, the components of this meal include slippery bún, fresh crab meat, blocks of tofu and stewed tomatoes. Cooking an authentic bowl of bún riêu is a labour-intensive process. ",
      date: '21-8-2025',
      image: 'https://vietnam.travel/sites/default/files/inline-images/Must%20try%20Vietnamese%20Dishes-10_0.jpg',
      isFavoriteActive: false
    },
    {
      id: '5',
      title: 'Banh Mi',
      description: 'Baguettes may have been adopted from the French, but bánh mì is as Vietnamese as it comes. Paté and margarine are spread swiftly across the soft, chewy interior of a baguette and later, the sandwich is loaded with pickled vegetables, fresh cilantro, pork belly, pork floss',
      date: '21-8-2025',
      image: 'https://vietnam.travel/sites/default/files/inline-images/1016%20AJS%20Vietnam%20TAB%20Food-7.jpg',
      isFavoriteActive: false
    },
    {
      id: '6',
      title: 'Com Tam',
      description: 'Back in the day, Vietnamese farmers would eat the fractured rice grains they could not sell. Nowadays, “broken” rice is a food staple for the everyday working-class citizen. For a meal of humble origins, the preparations for cơm tấm can get very decadent.',
      date: '21-8-2025',
      image: 'https://vietnam.travel/sites/default/files/inline-images/Must%20try%20Vietnamese%20Dishes-12.jpg',
      isFavoriteActive: false
    },
    {
      id: '7',
      title: 'Bun Bo',
      description: 'Representing the legendary royal cuisine of Hue, bún bò huế is a mighty demonstration of both beauty and taste. The alarmingly red broth is the first signal of its striking flavour—the result of hours spent simmering beef bones and stalks of lemongrass to produce a citrusy concoction.',
      date: '21-8-2025',
      image: 'https://res.cloudinary.com/jerrick/image/upload/v1746694074/681c6fb9306f35001d13ad16.jpg',
      isFavoriteActive: false
    }, {
      id: '8',
      title: 'Mi Quang',
      description: 'Part soup, part salad, mì quảng gracefully pulls off an identity crisis. That being said, don’t let the elegance of mì quảng fool you. This light and springy noodle dish from the Quang Nam province in Central Vietnam is street food.',
      date: '21-8-2025',
      image: 'https://vietnam.travel/sites/default/files/inline-images/1016%20AJS%20Vietnam%20TAB%20Food-5.jpg',
      isFavoriteActive: false
    },

  ]
  isFill = true
  dialog: any;
  toggleFavorite(recipe: any) {
    recipe.isFavoriteActive = !recipe.isFavoriteActive;
  }
  onEdit(recipe: any) {

  }
  constructor(private router: Router) {}

  onDelete(recipe: any) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.myRecipes = this.myRecipes.filter(r => r !== recipe);
      }
    });
  }
  cuisines = [
    'Indian Cuisine',
    'Chinese Cuisine',
    'Thailand Cuisine',
    'Italian Cuisine',
    'Vietnamese Cuisine',
    'Korean Cuisine',
    'Japanese Cuisine'
  ];
  difficultyLevels = ['Easy', 'Medium', 'Hard'];
  filterCuisine(cuisine: string) {

  }
  filterDifficulty(level: string) {
    // Xử lý lọc theo độ khó
  }
 
  navigateToDetail(id: string) {
    this.router.navigate(['/recipe-detail', id]);
  }

  declarations!: [
    MyRecipeComponent,
    DeleteConfirmDialogComponent
  ];
}

