export type CommentRecord = {
  id: string;
  postSlug: string;
  parentId?: string;
  authorName: string;
  body: string;
  approved: boolean;
  createdAt: string;
};

const comments = new Map<string, CommentRecord[]>();
const bookmarks = new Set<string>();
const reactions = new Map<string, number>();
const follows = new Set<string>();

export const engagementRepository = {
  listComments(postSlug: string) {
    return comments.get(postSlug)?.filter((comment) => comment.approved) ?? [];
  },
  createComment(input: Omit<CommentRecord, "id" | "approved" | "createdAt">) {
    const record: CommentRecord = {
      ...input,
      id: crypto.randomUUID(),
      approved: false,
      createdAt: new Date().toISOString(),
    };
    comments.set(input.postSlug, [...(comments.get(input.postSlug) ?? []), record]);
    return record;
  },
  toggleBookmark(userId: string, postSlug: string) {
    const key = `${userId}:${postSlug}`;
    if (bookmarks.has(key)) {
      bookmarks.delete(key);
      return false;
    }
    bookmarks.add(key);
    return true;
  },
  react(postSlug: string) {
    const next = (reactions.get(postSlug) ?? 0) + 1;
    reactions.set(postSlug, next);
    return next;
  },
  followAuthor(userId: string, authorSlug: string) {
    follows.add(`${userId}:${authorSlug}`);
    return true;
  },
};
