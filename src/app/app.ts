import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./core/footer/footer";
import { Header } from "./core/header/header";
import { Sidebar } from "./core/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rezept-radar');
}
