import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  isPrepared: boolean;
}

interface Step {
  id: string;
  description: string;
  image?: string;
  time?: string;
}

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface CommentItem {
  id: string;
  author: string;
  avatarUrl?: string;
  message: string;
  createdAt: string;
  isLiked?: boolean;
  likes?: number;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  videoUrl?: string;
  author: string;
  cookingTime: string;
  servings: number;
  difficulty: string;
  country: string;
  rating: number;
  totalRatings: number;
  isFavorite: boolean;
  isSaved: boolean;
  ingredients: Ingredient[];
  steps: Step[];
  nutrition: Nutrition;
  date: string;
}

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  recipeId: string = '';
  selectedTabIndex = 0;
  userRating = 0;
  hoverRating = 0;
  Math = Math; // Để sử dụng trong template

  comments: CommentItem[] = [];
  newComment: string = '';
  currentUser: string = 'Bạn'; // Mock current user

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.loadRecipe();
    });
  }

  loadRecipe() {
    // Mock data - trong thực tế sẽ gọi API
    const mockRecipes: Recipe[] = [
      {
        id: '1',
        title: 'Phở Bò Việt Nam',
        description: 'Phở là món ăn đặc trưng của Việt Nam, từ phở dùng để chỉ loại bánh phở được sử dụng trong công thức. Bánh phở dẹt bằng gạo nhảy múa cùng với những lát thịt bò tái hoặc thịt gà luộc trong nước dùng bò đậm đà.',
        mainImage: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        author: 'Chef Khoa',
        cookingTime: '3 giờ',
        servings: 4,
        difficulty: 'Trung bình',
        country: 'Việt Nam',
        rating: 4.8,
        totalRatings: 156,
        isFavorite: false,
        isSaved: false,
        ingredients: [
          { id: '1', name: 'Bánh phở', amount: '500g', isPrepared: false },
          { id: '2', name: 'Thịt bò tái', amount: '300g', isPrepared: false },
          { id: '3', name: 'Nước dùng bò', amount: '2 lít', isPrepared: false },
          { id: '4', name: 'Hành lá', amount: '100g', isPrepared: false },
          { id: '5', name: 'Rau thơm', amount: '200g', isPrepared: false },
          { id: '6', name: 'Giá đỗ', amount: '150g', isPrepared: false },
          { id: '7', name: 'Chanh', amount: '2 quả', isPrepared: false },
          { id: '8', name: 'Ớt tươi', amount: '50g', isPrepared: false },
          { id: '9', name: 'Nước mắm', amount: '100ml', isPrepared: false },
          { id: '10', name: 'Muối', amount: '2 thìa cà phê', isPrepared: false }
        ],
        steps: [
          {
            id: '1',
            description: 'Nấu nước dùng bò với xương và gia vị trong 2-3 giờ để có vị đậm đà',
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
            time: '2-3 giờ'
          },
          {
            id: '2',
            description: 'Luộc bánh phở theo hướng dẫn trên bao bì, không để quá mềm',
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
            time: '5-7 phút'
          },
          {
            id: '3',
            description: 'Thái thịt bò mỏng và để tái, chuẩn bị rau thơm, hành lá, giá đỗ',
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
            time: '15 phút'
          },
          {
            id: '4',
            description: 'Trụng bánh phở trong nước sôi, xếp vào tô, thêm thịt bò',
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
            time: '3 phút'
          },
          {
            id: '5',
            description: 'Rưới nước dùng nóng, thêm rau thơm và gia vị theo khẩu vị',
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
            time: '2 phút'
          }
        ],
        nutrition: {
          calories: 450,
          protein: 25,
          carbs: 65,
          fat: 12,
          fiber: 8
        },
        date: '21-8-2025'
      }
    ];

    this.recipe = mockRecipes.find(r => r.id === this.recipeId) || null;

    // Mock comments
    this.comments = [
      { 
        id: 'c1', 
        author: 'An', 
        message: 'Món này nhìn hấp dẫn quá!', 
        createdAt: new Date().toISOString(),
        isLiked: false,
        likes: 5
      },
      { 
        id: 'c2', 
        author: 'Bình', 
        message: 'Mình đã thử và rất ngon.', 
        createdAt: new Date().toISOString(),
        isLiked: true,
        likes: 12
      }
    ];

    if (!this.recipe) {
      this.router.navigate(['/home']);
    }
  }

  goBack() {
    this.router.navigate(['..']);
  }

  toggleFavorite() {
    if (this.recipe) {
      this.recipe.isFavorite = !this.recipe.isFavorite;
      const message = this.recipe.isFavorite ? 'Đã thêm vào yêu thích!' : 'Đã bỏ khỏi yêu thích!';
      this.showSnackBar(message);
    }
  }

  toggleSaved() {
    if (this.recipe) {
      this.recipe.isSaved = !this.recipe.isSaved;
      const message = this.recipe.isSaved ? 'Đã lưu công thức!' : 'Đã bỏ lưu công thức!';
      this.showSnackBar(message);
    }
  }

  setRating(rating: number) {
    this.userRating = rating;
    if (this.recipe) {
      this.showSnackBar(`Bạn đã đánh giá ${rating} sao!`);
    }
  }

  onRatingHover(rating: number) {
    this.hoverRating = rating;
  }

  onRatingLeave() {
    this.hoverRating = 0;
  }

  toggleIngredient(ingredient: Ingredient) {
    ingredient.isPrepared = !ingredient.isPrepared;
  }

  shareRecipe(platform: string) {
    let shareUrl = '';
    const recipeUrl = window.location.href;
    const recipeTitle = this.recipe?.title || 'Công thức nấu ăn';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`;
        break;
      case 'zalo':
        shareUrl = `https://zalo.me/share?u=${encodeURIComponent(recipeUrl)}&t=${encodeURIComponent(recipeTitle)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(recipeUrl)}&text=${encodeURIComponent(recipeTitle)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(recipeUrl);
        this.showSnackBar('Đã sao chép link!');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  addComment() {
    const text = (this.newComment || '').trim();
    if (!text) {
      return;
    }
    const newItem: CommentItem = {
      id: 'c_' + Date.now().toString(36),
      author: 'Bạn',
      message: text,
      createdAt: new Date().toISOString(),
      isLiked: false,
      likes: 0
    };
    this.comments = [newItem, ...this.comments];
    this.newComment = '';
    this.showSnackBar('Đã đăng bình luận');
  }

  deleteComment(id: string) {
    this.comments = this.comments.filter(c => c.id !== id);
  }

  likeComment(comment: CommentItem) {
    comment.isLiked = !comment.isLiked;
    if (comment.isLiked) {
      comment.likes = (comment.likes || 0) + 1;
    } else {
      comment.likes = Math.max(0, (comment.likes || 0) - 1);
    }
  }

  replyToComment(comment: CommentItem) {
    this.newComment = `@${comment.author} `;
    // Focus on comment input
    setTimeout(() => {
      const textarea = document.querySelector('.comment-input textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
      }
    }, 100);
  }

  reportComment(comment: CommentItem) {
    this.showSnackBar(`Đã báo cáo bình luận của ${comment.author}`);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
