# Okay the first thing i am going to revise and also learn deeply is DBMS
FYI i your are ever reading this ever , this is not going to be a synchronous and neat doc, it is just going to be async and unedited and may be some typos here and there, but if i post it
on github, know that it was useful for me and it is going to be useful for you, to make some warmup muscle for your mind before actually coding.

## Database indexing and Query planning
okay, first i started with checking the comparison between the sqlite vs postgresql , as i was actually using sqlite3 , somewhere i knew that postgresql is better, like most of the tine
but to escape the complexity of using the terminal and all and for local dev feasibility i used sqlite, so after reading the doc, i came to conclusion that major big companies like apple use
sqlite but for there mobiles and also firefox does use it but for locally, so what does it mean? It means that we can use sqlite if we have an architecture has the installation scaling not system scaling, 
for example when we have one user per the database like browsers, mobile apps, cli tools, where each users gets there own sqlite file and sqlite scales by copying the database per user.

now on the other side postgres can be used when the architecture is client-server,multiple users hit the same database, high write concurrency, complex join and queries and examples are
webapps, apis, saas and financial systems, postgres scales by sharing the db across the users.

the next thing which did was watching video on database indexing by Hussien Nasser, which is good, i got to know why we use indexing and how they reduce time and computational cost, now from
the video the main crux that we need is to learn that, in dbms querying one of the concept is indexing, and the sole purpose of the queries are to retrieve and our role is to always find a way
to reduce the cost of retrieving something and be effective by applying such concepts. 

- explain analyse thing in the postgresql was great, i did not know, that it actually existed




