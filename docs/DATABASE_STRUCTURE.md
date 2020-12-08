The database is a document oriented NoSQL database, firestore. The data is organized arround this schema:

```ts
{
    classes: [ // The list of main classes there are (Jahrgänge).
        [className]: {
            courses: [ // The list of courses there are (Fächer).
                [courseName]: {
                    uniqueSubCourse: boolean, // Says if the class has multiple subcourses or not.
                    subCourses: [ // The list of subcourses there are (Kurs).
                        [uniqueSubCourse ? "default" : subClassName]: {
                            admins: string[], // List of the User IDs of users with create and delete perms.
                            homeworks: [ // The list of homeworks for that class
                                [homeworkTitleAsSlug]: {
                                    title: string, // The title of the homwework.
                                    content: string, // The detailed description of the homework.
                                    startDate: Date, // The date the homework was given.
                                    dueDate: Date, // The date the homework should be returned.
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    permissions: [
        [userID]: {
            verified: boolean, // Gives access to the app to an user.
            className: string, // Says to which class a user belongs.
            courses: [ // List of courses a user is in
                [courseName]: [
                    [subCourseNames]: string[], // List of names of the subcourses the user is in.
                ],
            ],
        },
    ],
}
```
