

## Back end Entity/DB Design

Entity:

1: User

2: Resume

3: Work

4: Education

5: Award

Notes:

1: Each entity is one to many realtion ship to user, which has a foreign key as user id

2: Resmuse entity contain the header information

3: Resume and works, education are many-to-many relationship, this could help reuse work to different version of resume for user to build, which could make a combination of works to different resume template.

For example I have work 1, work 2, wish to palce to resume 1, and resume 2 want to link with work 1 and work 3 (a different version of work 2)

We could have flexibly to edit works and place work to resume. 

4: Same as education, many to many relation with resume



![entity-relation](/Users/zeyaoliu/Desktop/dev/ng-resume-fe/ng-resume-builder/design/entity-relation.jpg)

