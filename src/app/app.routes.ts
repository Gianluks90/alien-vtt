import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        title: 'Alterego',
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page').then(m => m.LandingPage)
    },
    {
        title: 'Home',
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
    },
    {
        title: 'Map Editor',
        path: 'map-editor/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/map-editor-page/map-editor-page').then(m => m.MapEditorPage)
    },
    {
        title: 'Mission Editor',
        path: 'mission/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/mission-editor-page/mission-editor-page').then(m => m.MissionEditorPage)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
