import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-my-favourite-recipe',
  imports: [ShareModule, MaterialModule],
  templateUrl: './my-favourite-recipe.component.html',
  styleUrl: './my-favourite-recipe.component.scss'
})
export class MyFavouriteRecipeComponent {
  myRecipes = [
    {
      title: 'Kachori chaat',
      description: ' Kachori chaat is pastry that is stuffed with spicy peas and fried until crisp and golden. Serve topped with yoghurt and tamarind chutney.',
      date: '21-8-2025',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/kachori_chaat_31564_16x9.jpg',
      isFavoriteActive: false
    },
    {
      title: 'Sausage and tortellini soup',
      description: 'Transform shop-bought tortellini into a cosy midweek soup, made with mini sausage meatballs and finished with Parmesan.',
      date: '21-8-2025',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/sausage_and_tortellini_59553_16x9.jpg',
      isFavoriteActive: false
    },
    {
      title: 'Shredded tofu peanut ramen',
      description: 'This quick and easy vegan noodle soup is packed with umami flavours, from the soy sauce broth to the marinated crispy tofu.',
      date: '21-8-2025',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/shredded_tofu_peanut_58701_16x9.jpg',
      isFavoriteActive: false
    },
    {
      title: 'Vegetable Thai curry',
      description: "Packed with vegetables, Mary Berry's Thai curry uses ready-made paste for ease and speed. Serve with rice.",
      date: '21-8-2025',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/vegetable_thai_curry_91251_16x9.jpg',
      isFavoriteActive: false
    },
    {
      title: 'Cold kimchi noodles',
      description: ' Inspired by the Korean classic bibim-guksu, this quick and easy dish features cold noodles tossed in a sweet, spicy and tangy sauce, loaded with gut-nourishing kimchi. Topped with cucumber and a boiled egg, it makes for a tasty, refreshing meal.',
      date: '21-8-2025',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/cold_kimchi_noodles_46688_16x9.jpg',
      isFavoriteActive: false
    },
    {
      title: 'Sticky chicken bao',
      description: 'These fluffy, light bao are made in a jiffy, skipping the yeast and proving stages. The sticky sesame chicken filling is insanely moreish, too.',
      date: '21-8-2025',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/sticky_chicken_in_quick_22426_16x9.jpg',
      isFavoriteActive: false
    },
    {
      title: 'Bun Bo',
      description: 'Representing the legendary royal cuisine of Hue, bún bò huế is a mighty demonstration of both beauty and taste. The alarmingly red broth is the first signal of its striking flavour—the result of hours spent simmering beef bones and stalks of lemongrass to produce a citrusy concoction.',
      date: '21-8-2025',
      image: 'https://res.cloudinary.com/jerrick/image/upload/v1746694074/681c6fb9306f35001d13ad16.jpg',
      isFavoriteActive: false
    }, {
      title: 'Mi Quang',
      description: 'Part soup, part salad, mì quảng gracefully pulls off an identity crisis. That being said, don’t let the elegance of mì quảng fool you. This light and springy noodle dish from the Quang Nam province in Central Vietnam is street food.',
      date: '21-8-2025',
      image: 'https://vietnam.travel/sites/default/files/inline-images/1016%20AJS%20Vietnam%20TAB%20Food-5.jpg',
      isFavoriteActive: false
    },

  ]
  isFill = true
  toggleFavorite(recipe: any) {
    recipe.isFavoriteActive = !recipe.isFavoriteActive;
  }
difficultyLevels = ['Easy', 'Medium', 'Hard'];
cuisines = ['Indian Cuisine', 'Chinese Cuisine', 'Thailand Cuisine', 'Italian Cuisine', 'Vietnamese Cuisine', 'Korean Cuisine', 'Japanese Cuisine'];

filterDifficulty(level: string) {
  // Xử lý lọc theo độ khó
}

filterCuisine(cuisine: string) {
  // Xử lý lọc theo loại món
}
}
