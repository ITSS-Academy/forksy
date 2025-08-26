import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  difficulty: string;
  cookingTime: string;
}

@Component({
  selector: 'app-my-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.scss'
})
export class MyRecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    // Mock data - trong thực tế sẽ gọi API
    this.recipes = [
      {
        id: '1',
        title: 'Phở',
        description: 'Phở là món ăn đặc trưng của Việt Nam, từ phở dùng để chỉ loại bánh phở được sử dụng trong công thức. Bánh phở dẹt bằng gạo nhảy múa cùng với những lát thịt bò tái hoặc thịt gà luộc trong nước dùng bò đậm đà.',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
        author: 'Chef Việt',
        date: '21-8-2025',
        difficulty: 'Trung bình',
        cookingTime: '3 giờ'
      },
      {
        id: '2',
        title: 'Bún Chả',
        description: 'Bún chả trở thành hiện tượng qua đêm sau khi Tổng thống Obama được chụp ảnh đang ăn một tô bún chả với Anthony Bourdain. Nhưng món ăn đặc biệt này của phố cổ Hà Nội đã luôn được người dân địa phương yêu thích.',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
        author: 'Chef Hà Nội',
        date: '21-8-2025',
        difficulty: 'Dễ',
        cookingTime: '1 giờ'
      },
      {
        id: '3',
        title: 'Bún Đậu Mắm Tôm',
        description: 'Bún đậu mắm tôm là món ăn đường phố đặc trưng miền Bắc Việt Nam, với bún, đậu phụ chiên giòn, thịt lợn luộc và rau thơm. Điểm nhấn là mắm tôm (mắm tôm lên men) trộn với chanh, ớt và đường, tạo nên hương vị đậm đà và khó quên.',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
        author: 'Chef Miền Bắc',
        date: '21-8-2025',
        difficulty: 'Trung bình',
        cookingTime: '2 giờ'
      },
      {
        id: '4',
        title: 'Bún Riêu',
        description: 'Sự tương tác giữa cua và cà chua làm cho bún riêu trở thành một món ăn thực sự nổi bật. Một món súp đậm đà với vị chua, các thành phần của bữa ăn này bao gồm bún trơn, thịt cua tươi, đậu phụ và cà chua hầm.',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
        author: 'Chef Miền Nam',
        date: '21-8-2025',
        difficulty: 'Khó',
        cookingTime: '4 giờ'
      }
    ];

    this.filteredRecipes = [...this.recipes];
  }

  searchRecipes() {
    if (!this.searchTerm.trim()) {
      this.filteredRecipes = [...this.recipes];
    } else {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  viewRecipeDetail(recipeId: string) {
    this.router.navigate(['/recipe-detail', recipeId]);
  }

  editRecipe(recipeId: string) {
    this.router.navigate(['/update-recipe', recipeId]);
  }

  deleteRecipe(recipeId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa món ăn này?')) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
      this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.id !== recipeId);
    }
  }
}
