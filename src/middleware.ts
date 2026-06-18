export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/entities/:path*', '/admin/claims/:path*'],
}
