import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

const Head = ({ children }: { children: undefined | {} }) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>

            {/* Alpine and Alpine Ajax */}
            <script defer src="https://cdn.jsdelivr.net/npm/@imacrayon/alpine-ajax@0.5.0/dist/cdn.min.js"></script>
            <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.11.1/dist/cdn.min.js"></script>

        </head>
        <body>
            {children}
        </body>
    </html>
);

const LikeButton = ({ id }: { id: string }) => (
    <form id="like" x-init x-target method="post" action={`/comments/${id}/like`}>
        <button >Like</button>
    </form>
)

const UnlikeButton = ({ id }: { id: string }) => (
    <form id="like" x-init x-target method="delete" action={`/comments/${id}/like`}>
        <button x-autofocus>Unlike</button>
    </form>
)

const app = new Elysia()
    .use(html())
    .get("/", () => (
        <Head>
            <LikeButton id={"1"} />
        </Head>
    ))
    .delete("/comments/:id/like", ({ params }) => (
        <LikeButton id={params.id} />
    ))
    .post("comments/:id/like", ({ params }) => (
        <UnlikeButton id={params.id} />
    ))
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
