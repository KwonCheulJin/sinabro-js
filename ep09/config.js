export default {
  build: {
    contents: 'contents',
    pages: 'pages',
    dist: 'dist',
    contentsSlug: 'post',
    assets: 'assets',
  },
  site: { title: 'My Blog', author: 'Charles' },
  updatePost(post) {
    post.created_at = post.created_at.toLocaleDateString();
    return post;
  },
};
