import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import HomePage from "./pages";
import FeedPage from "./pages/feed";
import ArticleDetailPage from "./pages/articles/:slug";
import EditorPage from "./pages/editor";
import EditorArticlePage from "./pages/editor/:articleSlug";
import LoginPage from "./pages/login";
import ProfilesDetailPage from "./pages/profiles/:username";
import ProfilesFavoritesPage from "./pages/profiles/:username/favorites";
import RegisterPage from "./pages/register";
import SettingsPage from "./pages/settings";
import { Protected } from "./components/Protected";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="feed"
              element={
                <Protected>
                  <FeedPage />
                </Protected>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="settings"
              element={
                <Protected>
                  <SettingsPage />
                </Protected>
              }
            />
            <Route
              path="editor"
              element={
                <Protected>
                  <EditorPage />
                </Protected>
              }
            />
            <Route
              path="editor/:articleSlug"
              element={
                <Protected>
                  <EditorArticlePage />
                </Protected>
              }
            />
            <Route path="articles/:slug" element={<ArticleDetailPage />} />
            <Route path="profiles/:username" element={<ProfilesDetailPage />} />
            <Route
              path="profiles/:username/favorites"
              element={<ProfilesFavoritesPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
