#kisan network
have used boiler plate for mean stack development.
#while adding number please dont put country code; its configured in that way.
/*eg: use 9099317496, not +91....*/

have tried making assignment project content dynamic, not static.
#on server side
apis :-

-for db had used mongodb atlast for easier/free db access online easily.
-for creating admin user,
-for creating admin profile( detail of admin)
-for creating contacts,
-for sending msged had used twilio , integrated it too but putting on git is making token expired due to security reason, can be used locally right now.( not familiar wwith deployment a lot, thats why had uploaded env file which is raising this issue, ideally shouldnt upload envs on git )
,have revised auth keys in project so can be access locally.
-accesing admin contact ( have access to their contacts for edit, send msg and delete)
-accesing list of all contacts in db ( with data for the admin who created )
-cross admins access is denied i.e x admin cant delete, edit or send msg to y's contact
-login with jwt


#On frontend side.
-first screen is homepage of web-app info
-user can signup/sign to access contact
-first screen of user have all contacts in kisan network
-anyone can click and see user detail.(it has otp sent list in desc order)
-my contact header menu has the admins contact, on clicking the contact  the admin can send msg, edit or delete contact.
-on my contact, all contacts has otp sent list in desc order


#further imporvment scopes;
on contact delete, it should be send to some sort of recycle bin  i.e discarded stage. shouldnt delete from db directly permanently.
other admin contacts should have option of import so anyone can directly make other admin contact theirs.
beter ui could be designed.
should have build on gatsby as it was smaller app, can be must faster



#instruction to run project.
open project in terminal 
node and ng is assumed to be installed on your device.
if not installed please install it using this link as per your device : -https://nodejs.org/en/download/
for ng: - https://angular.io/cli

open project on terminal/vscode/ide
run npm install
npm start , will start server on localhost:3000

cd FRONTEND
npm i
ng serve, will start frontend server on localhost:4200
