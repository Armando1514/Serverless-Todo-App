/*

    -todoId (string) - a unique id for an item
    - userId(string) - represents the user
    -createdAt (string) - date and time when an item was created
    -name (string) - name of a TODO item (e.g. "Change a light bulb")
    -dueDate (string) - date and time by which an item should be completed
    -done (boolean) - true if an item was completed, false otherwise
    -attachmentUrl (string) (optional) - a URL pointing to an image attached to a TODO item

*/

export interface Todo {
  todoId: string;
  userId: string;
  createdAt: string;
  name: string;
  dueDate: string;
  done: boolean;
  attachmentUrl: String;
}
