const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\User\\Downloads\\vis\\fowgate\\frist task\\src';

console.log("Updating App.jsx...");
let appPath = path.join(srcDir, 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/from '\.\/components\/([^']+)'/g, "from './components/$1/$1'");
fs.writeFileSync(appPath, appContent);

console.log("Updating components...");
const compDir = path.join(srcDir, 'components');
const components = ['Sidebar', 'MyAppraisalsPage', 'ExpenseClaimsPage', 'Header'];
for (const comp of components) {
    let p = path.join(compDir, comp, comp + '.jsx');
    let content = fs.readFileSync(p, 'utf8');
    // Fix assets
    content = content.replace(/from '\.\.\/assets/g, "from '../../assets");
    
    // Fix modals in pages
    content = content.replace(/from '\.\/modals\/([^']+)'/g, "from '../modals/$1/$1'");
    
    fs.writeFileSync(p, content);
}

console.log("Updating modals...");
const modalsDir = path.join(compDir, 'modals');
const modals = ['AddEditClaimModal', 'AppraisalReport', 'CancelClaimModal', 'ClaimStatusModal', 'NotificationPanel', 'ViewDetailModal', 'AttachmentIcon'];
for (const mod of modals) {
    let p = path.join(modalsDir, mod, mod + '.jsx');
    if (!fs.existsSync(p)) continue;
    let content = fs.readFileSync(p, 'utf8');
    
    // Fix assets
    content = content.replace(/from '\.\.\/\.\.\/assets/g, "from '../../../assets");
    
    // Fix nested modals/utils: 
    content = content.replace(/from '\.\/([^']+)'/g, (match, p1) => {
        if (p1.endsWith('.css')) return match; 
        if (p1 === 'attachmentUtils') return "from '../attachmentUtils'";
        return `from '../${p1}/${p1}'`;
    });
    
    fs.writeFileSync(p, content);
}
console.log("Done.");
